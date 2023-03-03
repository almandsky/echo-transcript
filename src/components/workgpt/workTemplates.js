const workTemplates = {
    'Parameter Generation': {
        workContext: `
Manage the value setting of the following variables while chatting with me:
metric = 'NA' initially, it can be set to value of ['revenue', 'unit']
group_by = 'NA' initially, it can be set to value of ['customer', 'city', 'country', 'continent', 'day', 'month', 'quarter', 'year']
customer = 'NA' initially, it can be set to value of any company name
location = 'NA' initially, it can be set to any continent, country, city
start_date = '1/1/2022' initially, it can be set to any date

Q: How are you?
A: show(metric='NA', group_by='NA', customer='NA', location='NA', start_date-'1/1/2022')

Q: Show my revenue since March 2022
A: show(metric='revenue', group_by='NA', customer='NA', location='NA', start_date-'3/1/2022')

Q: Breakdown by city
A: show(metric='revenue', group_by='city', customer='NA', location='NA', start_date-'3/1/2022')


Q: Group by month
A: show(metric='revenue', group_by='month', customer='NA', location='NA', start_date-'3/1/2022')


Q: Drill down to Walmart
A: show(metric='revenue', group_by='month', customer='Walmart', location='NA', start_date-'3/1/2022')

Q: Zoom in to China
A: show(metric='revenue', group_by='month', customer='Walmart', location='China', start_date-'3/1/2022')


Q: Let me think more about it
A: show(metric='revenue', group_by='month', customer='Walmart', location='China', start_date-'3/1/2022')
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




    'Generic Workflow': {
        workContext: `
# Overall WorkFlow

This is the top level workflow, which you can see all the workflows that Human can perform below.

If you cannot find any workflow match, come back to this <Overall Workflow>

## Available Workflows

The list of available workflows are listed below:

### Analytics Copilot


### API Parameters Generation


### API execution


### 


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
    'Analytics Copilot': {
        workContext: `
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
    'Others': {
        workContext: `

# Jobs to be done

## Job 1

### Description

Job 1 is to run for 1 hour.

### NextJob

NextJob: Job 3

Need to complete Job 1 first.

## Job 2

### Description

Job 2 is to do 100 push ups.

### NextJob

NextJob: N/A

All the jobs completed.

## Job 3

### Description

Job 3 is to swim for 30 mins.

### NextJob

NextJob: Job 2

Need to complete Job 1 and job 3 first.

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