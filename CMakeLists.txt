cmake_minimum_required(VERSION 3.31)

find_package(cmake-pear REQUIRED PATHS node_modules/cmake-pear)

project(pear_appling C CXX ASM)

add_pear_appling(
  pear_appling
  KEY "8mzabhx3kbpq88eqy7wiuu1csjqqkry19c3di8nixu5rgt6cmupy"
  NAME "PearPass"
  VERSION 1.0.0
  AUTHOR "Tether Data S.A. de C.V."
  DESCRIPTION "A secure, decentralized and fully local password manager"

  MACOS_IDENTIFIER com.pears.pass
  MACOS_CATEGORY public.app-category.productivity
  MACOS_SIGNING_IDENTITY "0FBAF04EEFAB7158EA793100FF2731E91E330A88"

  WINDOWS_SIGNING_SUBJECT "<string>"
  WINDOWS_SIGNING_THUMBPRINT <sha1>

  LINUX_CATEGORY Utility
)
