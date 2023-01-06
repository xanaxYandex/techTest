export const findObjectsByProp = <T>(array: T[], prop: string, labelText: string) => {
    return array.filter((item) =>
        item[prop].toLowerCase().includes(labelText.toLowerCase().trim())
    );
};
