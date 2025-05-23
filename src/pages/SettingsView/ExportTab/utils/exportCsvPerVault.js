import { downloadFile } from './downloadFile'
import { downloadZip } from './downloadZip'

export const handleExportCSVPerVault = async (data) => {
  const vaultsToExport = []

  const typeSpecificFields = {
    login: ['username', 'password', 'websites'],
    creditCard: ['name', 'number', 'expireDate', 'securityCode', 'pinCode'],
    identity: [
      'fullName',
      'email',
      'phoneNumber',
      'address',
      'zip',
      'city',
      'region',
      'country'
    ],
    note: [],
    custom: []
  }

  const alwaysFirst = ['type', 'vaultName', 'title']
  const alwaysMiddle = ['note', 'customFields', 'folder', 'isFavorite']
  const alwaysLast = ['createdAt', 'updatedAt']

  data.forEach((vault) => {
    const vaultRecords = vault.records.map((record) => ({
      ...record,
      vaultName: vault.name
    }))

    if (!vaultRecords || vaultRecords.length === 0) {
      return
    }

    const typesInUse = new Set(vaultRecords.map((r) => r.type))
    const dynamicFields = new Set()

    typesInUse.forEach((type) =>
      (typeSpecificFields[type] || []).forEach((field) =>
        dynamicFields.add(field)
      )
    )

    alwaysFirst
      .concat(alwaysMiddle, alwaysLast)
      .forEach((f) => dynamicFields.delete(f))

    const orderedHeaders = [
      ...alwaysFirst,
      ...Array.from(dynamicFields),
      ...alwaysMiddle,
      ...alwaysLast
    ]

    const csvRows = [orderedHeaders.join(',')]

    vaultRecords.forEach((record) => {
      const data = record.data || {}

      const row = {
        type: record.type,
        vaultName: record.vaultName || '',
        title: data.title || '',

        username: data.username || '',
        password: data.password || '',
        websites: (data.websites || []).join(';'),

        name: data.name || '',
        number: data.number || '',
        expireDate: data.expireDate || '',
        securityCode: data.securityCode || '',
        pinCode: data.pinCode || '',

        fullName: data.fullName || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        address: data.address || '',
        zip: data.zip || '',
        city: data.city || '',
        region: data.region || '',
        country: data.country || '',

        note: data.note || '',
        customFields: (data.customFields || [])
          .map((f) => `${f.type || 'note'}:${f.note}`)
          .join(';'),

        folder: record.folder || '',
        isFavorite: record.isFavorite ? 'true' : 'false',
        createdAt: record.createdAt,
        updatedAt: record.updatedAt
      }

      const escapedRow = orderedHeaders.map(
        (header) => `"${String(row[header] || '').replace(/"/g, '""')}"`
      )

      csvRows.push(escapedRow.join(','))
    })

    const content = csvRows.join('\n')

    const timestamp = new Date().toISOString().replace(/[:.-]/g, '_')
    const safeVaultName = vault.name.replace(/[^a-z0-9]/gi, '_')
    const filename = `PearPass_${safeVaultName}_${timestamp}.csv`

    vaultsToExport.push({
      filename,
      data: content
    })
  })
  if (vaultsToExport.length === 1) {
    downloadFile(
      {
        filename: vaultsToExport[0].filename,
        content: vaultsToExport[0].data
      },
      'csv'
    )
  } else if (vaultsToExport.length > 1) {
    await downloadZip(vaultsToExport)
  }
}
