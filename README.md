# nodejs-dynodb-audit-log

This script is designed to store updated logs or audit trails. When a change occurs within the JSON object, it verifies the previous record within the `new_value` field of the most recent audit log entry in DynamoDB. The latest audit logs will be filtered by `entry_status = 1`.

#### DynamoDB Schema:
```json
{
  "id": "345678",
  "ref_id": "11111",
  "latest_object": `{<full object>}`,
  "old_value": `{<last changed key values>}`, 
  "new_value": `{<recent changed keys values>}`,
  "new_date": "Y-m-d H:i:s",
  "old_date": "Y-m-d H:i:s",
  "entry_status": "1|0",
}
```

#### AWS DynamoDB CLI Commands:

```console
Run dynmodb database server on local host
foo@bar:~$ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb

List all tables available in the database
foo@bar:~$ aws dynamodb list-tables --endpoint-url http://localhost:8000

Delete single table from the tdatabase
foo@bar:~$ aws dynamodb delete-table --table-name audit-logs --endpoint-url http://localhost:8000

#Create Table
foo@bar:~$ aws dynamodb create-table --table-name jjjj --attribute-definitions AttributeName=Artist,AttributeType=S AttributeName=SongTitle,AttributeType=S --key-schema AttributeName=Artist,KeyType=HASH AttributeName=SongTitle,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url http://localhost:8000

#Insert Items to the table
foo@bar:~$ aws dynamodb put-item --table-name jjjj --item "{\"Artist\": {\"S\": \"Acme Band\"}, \"SongTitle\": {\"S\": \"Happy Day\"}, \"AlbumTitle\": {\"S\": \"Somewhat Famous\"}, \"Awards\": {\"N\": \"1\"}}" --endpoint-url http://localhost:8000

#Get Items from the table
foo@bar:~$ aws dynamodb get-item --consistent-read --table-name jjjj --key "{\"Artist\": {\"S\": \"Acme Band\"}, \"SongTitle\": {\"S\": \"Happy Day\"}}" --endpoint-url http://localhost:8000
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