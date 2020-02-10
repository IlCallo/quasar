// This is wrong and we know it
// It should be `any[]`, but this would break the adherence to `Vue` interface
// Use it like `(tableRef.data as unknown as any[])`
// See https://github.com/quasarframework/quasar/issues/6277
export type QTableDataPropType = () => object;
