export const getQueryString = (name: string) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = decodeURI(window.location.href).split('?')[1] ?
        decodeURI(window.location.href).split('?')[1].match(reg) : null;
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}