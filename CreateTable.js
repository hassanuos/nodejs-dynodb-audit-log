
const AWS = require('aws-sdk');

class CreateTable {
    constructor(config) {
        this.dynamodb = AWS.config.update(config);
        this.dynamodbQuery = new AWS.DynamoDB();
        this.dynamodbDoc = new AWS.DynamoDB.DocumentClient(config);
    }

    async createTable(tableName, params) {
        this.dynamodbQuery.describeTable({ TableName: tableName }, (err, data) => {
            if (err && err.code === 'ResourceNotFoundException') {
                this.dynamodbQuery.createTable(params, (err, data) => {
                if (err) {
                  console.error("Error creating table:", err);
                } else {
                  console.log("Table created successfully:", JSON.stringify(data, null, 2));
                }
              });
            } else if (err) {
              console.error("Error describing table:", err);
            } else {
              console.log("Table already exists:", JSON.stringify(data, null, 2));
            }
        });
    }
}

module.exports = CreateTable;