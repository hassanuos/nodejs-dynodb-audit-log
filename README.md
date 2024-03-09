# nodejs-dynodb-audit-log

This script is designed to store updated logs or audit trails. When a change occurs within the JSON object, it verifies the previous record within the `new_value` field of the most recent audit log entry in DynamoDB. The latest audit logs will be filtered by `entry_status = 1`.

#### DynamoDB Schema:
```json
{
  "id": "345678",
  "ref_id": "11111",
  "old_value": `{}`,
  "new_value": `{}`,
  "new_date": "Y-m-d H:i:s",
  "old_date": "Y-m-d H:i:s",
  "entry_status": "1|0",
}
```

#### Example:
```json
[
  {
    ref_id: { S: '11111' },
    old_date: { S: '2024-03-09 15:26:18' },
    entry_status: { S: '0' },
    old_value: {
      S: `{"id":11111,"city":"New York","state":"NV","companyInsiders":[{"firstName":"Ma2rilyn","middleName":"","lastName":"Ka2ne","corpEntity":"Au2tomated Retail Leasing Partners LP"},{"firstName":"Marilyn 1","middleName":"","lastName":"Kane1","corpEntity":"Automated Retail Leasing Partners LP"}]}`
    },
    id: { S: '391269' },
    new_date: { S: '2024-03-09 15:28:50' },
    new_value: {
		S: `{"id":11111,"city":"New York","state":"NV","companyInsiders":[{"firstName":"Hassan","middleName":"","lastName":"Ka2ne","corpEntity":"Au2tomated Retail Leasing Partners LP"},{"firstName":"Marilyn 1","middleName":"","lastName":"Kane1","corpEntity":"Automated Retail Leasing Partners LP"}]}`

    }
  },
  {
    ref_id: { S: '11111' },
    old_date: { S: '2024-03-09 15:26:18' },
    entry_status: { S: '0' },
    old_value: { S: '{}' },
    id: { S: '143373' },
    new_date: { S: '2024-03-09 15:26:18' },
    new_value: {
      	S: `{"id":11111,"city":"New York","state":"NV","companyInsiders":[{"firstName":"Ma2rilyn","middleName":"","lastName":"Raza","corpEntity":"Au2tomated Retail Leasing Partners LP"},{"firstName":"Marilyn 1","middleName":"","lastName":"Kane1","corpEntity":"Automated Retail Leasing Partners LP"}]}`
    }
  },
  {
    ref_id: { S: '11111' },
    old_date: { S: '2024-03-09 15:28:50' },
    entry_status: { S: '1' },
    old_value: {
		S: `{"id":11111,"city":"New York","state":"NV","companyInsiders":[{"firstName":"Hassan","middleName":"","lastName":"Ka2ne","corpEntity":"Au2tomated Retail Leasing Partners LP"},{"firstName":"Marilyn 1","middleName":"","lastName":"Kane1","corpEntity":"Automated Retail Leasing Partners LP"}]}`
    },
    id: { S: '147231' },
    new_date: { S: '2024-03-09 21:07:01' },
    new_value: {
		S: `{"id":11111,"city":"Los Angeles","state":"LA","companyInsiders":[{"firstName":"Cartle","middleName":"","lastName":"John","corpEntity":"Au2tomated Retail Leasing Partners LP"},{"firstName":"John","middleName":"","lastName":"Doe","corpEntity":"Manual Leasing Partner"}]}`
    }
  }
]
```