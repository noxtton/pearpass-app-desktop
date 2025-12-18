import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from 'react';
import { IconWrapper, Container, Message } from './styles';
import { ErrorIcon, YellowErrorIcon } from '../../lib-react-components';
export var AlertBoxType;
(function (AlertBoxType) {
    AlertBoxType["WARNING"] = "warning";
    AlertBoxType["ERROR"] = "error";
})(AlertBoxType || (AlertBoxType = {}));
/**
 * @param {Object} props
 * @param {string} props.message
 * @param {('warning'|'error')} [props.type='warning']
 * @param {string} [props.testId]
 * @returns {JSX.Element}
 */
export const AlertBox = ({ message, type = AlertBoxType.WARNING, testId }) => {
    const messageRef = useRef(null);
    const [isMultiLine, setIsMultiLine] = useState(false);
    useEffect(() => {
        if (messageRef.current) {
            const lineHeight = parseFloat(getComputedStyle(messageRef.current).lineHeight);
            const height = messageRef.current.offsetHeight;
            setIsMultiLine(height > lineHeight * 1.2);
        }
    }, [message]);
    return (_jsxs(Container, { type: type, "$isMultiLine": isMultiLine, "data-testid": testId, children: [_jsx(IconWrapper, { children: type === AlertBoxType.WARNING ? _jsx(YellowErrorIcon, { size: "18" }) : _jsx(ErrorIcon, { size: "18" }) }), _jsx(Message, { ref: messageRef, children: message })] }));
};
//# sourceMappingURL=index.js.map