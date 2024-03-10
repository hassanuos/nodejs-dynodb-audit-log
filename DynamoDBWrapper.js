const AWS = require('aws-sdk');

class DynamoDBWrapper {
    constructor(config) {
        this.dynamodb = AWS.config.update(config);
        this.dynamodbQuery = new AWS.DynamoDB();
        this.dynamodbDoc = new AWS.DynamoDB.DocumentClient(config);
    }

    async createItem(item, tableName){
        const params = {
            TableName: tableName,
            Item: item
        };
        try {
            await this.dynamodbDoc.put(params).promise();
            console.log("Item created successfully");
        } catch (error) {
            console.error("Unable to create item. Error:", error);
        }
    }

    async getItem(key, val, tableName){
        const filter = {
            TableName: tableName,
            FilterExpression: "contains(#key, :v)",
            ExpressionAttributeNames: { "#key": key },
            ExpressionAttributeValues: { ":v": {"S": val} }
        };
        
        const data = await this.dynamodbQuery.scan(filter).promise();
        return data.Items;
    }

    async allItems(tableName){
        const params = {
            TableName: tableName
        }
    
        try{
            const { Items = [] }  = await this.dynamodbQuery.scan(params).promise();
            Items.sort((a, b) => new Date(b.new_date.S) - new Date(a.new_date.S))
            console.log( Items );
    
        } catch(error){
            return { success: false, data: null }
        }
    }

    async deleteItem(key, val, tableName){
        const filter = {
            TableName: tableName,
            KeyConditionExpression: '#key = :v',
            ExpressionAttributeNames: { "#key": key },
            ExpressionAttributeValues: { ":v": val }
        };

        try {
            const data = await this.dynamodbDoc.query(filter).promise();
            console.log("Query results:", data.Items);
    
            // Delete each item returned by the query
            const deletePromises = data.Items.map(item => {
                const deleteParams = {
                    TableName: tableName,
                    Key: {
                        "id": item.id
                    }
                };
                return this.dynamodbDoc.delete(deleteParams).promise();
            });
    
            await Promise.all(deletePromises);
            console.log("Items deleted successfully.");
        } catch (err) {
            console.error("Unable to query and delete items. Error:", err);
        }
    }

    async bulkInsert(tableName, bulkdata){
        const batches = [];
        for (let i = 0; i < bulkdata.length; i += 25) {
            batches.push(bulkdata.slice(i, i + 25));
        }
        
        const params = {
            RequestItems: {
                'audit-logs': []
            }
        };

        batches.forEach(batch => {
            const batchRequest = batch.map(item => ({
                PutRequest: {
                    Item: item
                }
            }));
            params.RequestItems[tableName] = (params.RequestItems[tableName] || []).concat(batchRequest);
        });
    
        this.dynamodbDoc.batchWrite(params, (err, data) => {
            if (err) {
                console.error('Unable to batch write items:', JSON.stringify(err, null, 2));
            } else {
                console.log('Batch write successful:', JSON.stringify(data, null, 2));
            }
        });
    }

    async updateItem(itemId, attributeName, attributeValue, tableName) {
        const params = {
            TableName: tableName,
            Key: {
                'id': itemId
            },
            UpdateExpression: `set ${attributeName} = :value`,
            ExpressionAttributeValues: {
                ":value": attributeValue
            },
            ReturnValues: "ALL_NEW" // Return updated item
        };

        try {
            const data = await this.dynamodbDoc.update(params).promise();
            return data.Attributes; // Return updated item
        } catch (error) {
            console.error("Error updating item:", error);
            throw error;
        }
    }
    isEmptyObject(obj) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
          }
        }
        return true;
    }

    async updateMultipleItem(itemId, updatedAttributes, tableName) {
        const attributeNames = Object.keys(updatedAttributes);
        const expressionAttributeValues = {};
        const updateExpressionParts = [];

        attributeNames.forEach((attributeName, index) => {
            const placeholder = `:value${index}`;
            expressionAttributeValues[placeholder] = updatedAttributes[attributeName];
            updateExpressionParts.push(`${attributeName} = ${placeholder}`);
        });

        const updateExpression = `set ${updateExpressionParts.join(', ')}`;

        const params = {
            TableName: tableName,
            Key: {
                "id": itemId
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW" // Return updated item
        };

        try {
            const data = await this.dynamodbDoc.update(params).promise();
            return data.Attributes; // Return updated item
        } catch (error) {
            console.error("Error updating item:", error);
            throw error;
        }
    }

    getRandom(length) {
        const id = Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
        return id + '';
    }
}

module.exports = DynamoDBWrapper;