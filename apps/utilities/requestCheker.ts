interface RequestCheckerType {
  requireList: string[]
  requestData: any
}

export const requestChecker = ({
  requireList,
  requestData
}: RequestCheckerType): string => {
  const emptyField: string[] = []
  // eslint-disable-next-line array-callback-return
  requireList.map((value: string): void => {
    if (requestData[value] === undefined) {
      emptyField.push(value)
    }
  })
  return emptyField.toString()
}
