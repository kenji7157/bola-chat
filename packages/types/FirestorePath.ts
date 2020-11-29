export const accountCollectionPath = 'account';
export const accountDocumentPath = (accountUID: string): string => {
  return `${accountCollectionPath}/${accountUID}`;
};
