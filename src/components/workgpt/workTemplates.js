const workTemplates = {
    'Analytics Copilot': {
        workContext: `
API

<Tables>:

* TransactionTable: [tran_ID, date, customer, product, location, quantity, price]
* LocationTable: [continent, country, city]
* ProductTable: [product, category]

Query format:

SELECT <metric> FROM <Table>
WHERE <filters> 
GROUP BY <dimensions> 
ORDER BY <metric> 
LIMIT <k>


Parameters:

* <Table>, mandatory
    * One of the table provided above.
* <metric> = [sum(price), count(*)], mandatory
* <filters> optional
    * from <start_date> to <end_date> or last <k> days/months/year
    * product X or category Y
    * customer A
    * continent B or country C or city D
* <dimensions>, mandatory
    * by yearly/monthly/weekly
    * by continent/country/city
    * by customers
    * by categories/product

* <k>, optional


        `,
        actions: {
            'Execute getChart': {
                description: 'Execute the getChart()',
                command: (parameters) => {
                    console.log(`Executing getChart command for parameters: ${parameters}`);
                },
                processResult: (result, error) => {
                    if (error) {
                        console.error(`Failed to execute getChart command, error is ${error}`);
                    }

                    console.log(`Processed getChart result: ${result}`);
                }
            }
        }
    },
    'Generate Report': {
        workContext: `
        
        {
            "reportMetadata": {
              "aggregates": [
                "RowCount"
              ],
              "chart": null,
              "crossFilters": [],
              "currency": null,
              "dashboardSetting": null,
              "description": null,
              "detailColumns": [
                "ROLLUP_DESCRIPTION",
                "FULL_NAME",
                "ACCOUNT_NAME",
                "OPPORTUNITY_NAME",
                "STAGE_NAME",
                "FISCAL_QUARTER",
                "AMOUNT",
                "EXP_AMOUNT",
                "PROBABILITY",
                "AGE",
                "CLOSE_DATE",
                "CREATED_DATE",
                "NEXT_STEP",
                "LEAD_SOURCE",
                "TYPE"
              ],
              "developerName": "<report_name>",
              "division": null,
              "folderId": "<folder_id>",
              "groupingsAcross": [],
              "groupingsDown": [],
              "hasDetailRows": true,
              "hasRecordCount": true,
              "historicalSnapshotDates": [],
              "name": "NewReport",
              "presentationOptions": {
                "hasStackedSummaries": true
              },
              "reportBooleanFilter": null,
              "reportFilters": [],
              "reportFormat": "TABULAR",
              "reportType": {
                "label": "Opportunities",
                "type": "Opportunity"
              },
              "saveRoleHierarchy": false,
              "scope": "organization",
              "showGrandTotal": true,
              "showSubtotals": true,
              "sortBy": [],
              "standardDateFilter": {
                "column": "CLOSE_DATE",
                "durationValue": "LAST_SIX_MONTHS"
              },
              "standardFilters": [
                {
                  "name": "open",
                  "value": "all"
                },
                {
                  "name": "probability",
                  "value": ">0"
                }
              ],
              "supportsRoleHierarchy": true,
              "userOrHierarchyFilterId": null
            }
          }
        
        `,
        actions: {
            'Opportunity Report': {
                description: 'Provide the reports to query the information related to Opportunities.',
                command: (parameters) => {
                    console.log(`Executing Opportunity Report command for parameters: ${parameters}`);
                },
                processResult: (result, error) => {
                    if (error) {
                        console.error(`Failed to execute Opportunity Report command, error is ${error}`);
                    }

                    console.log(`Processed Opportunity Report result: ${result}`);
                }
            },
            'Sales Report': {
                description: 'Provide the reports to query the information related to Sales.',
                command: (parameters) => {
                    console.log(`Executing Sales Report command for parameters: ${parameters}`);
                },
                processResult: (result, error) => {
                    if (error) {
                        console.error(`Failed to execute Sales Report command, error is ${error}`);
                    }

                    console.log(`Processed Sales Report result: ${result}`);
                }
            },
            'Summary Report': {
                description: 'Provide the summary report for the whole company operations. Shall be the default options if other actions does not match.',
                command: (parameters) => {
                    console.log(`Executing Summary Report command for parameters: ${parameters}`);
                },
                processResult: (result, error) => {
                    if (error) {
                        console.error(`Failed to execute Summary Report command, error is ${error}`);
                    }

                    console.log(`Processed Summary Report result: ${result}`);
                }
            }
        }
    },
}

export default workTemplates;