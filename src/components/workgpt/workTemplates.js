const currentDate = new Date();

const workTemplates = {
    'Overall Workflow': {
        workContext: `
# Instruction

This is the top level workflow, which we can see all the workflows that can perform below.

If you cannot find any workflow match, come back to this 'Overall Workflow', and ask what to do next.

## Available Workflows

The list of available workflows are listed below.

### Overall WorkFlow

'Overall Workflow' is the entry point.  If you cannot find any matching workflow, come back to this 'Overall Workflow'.

### Analytics Workflow

'Analytics Workflow' is the workflow to define the the report parameters.  If Human want to know more about the Revenue and business related info, go to this 'Analytics Workflow'.

### Workout Workflow

'Workout Workflow' is to help to keep the 'Human' healthy.  It will guide the 'Human' on what he shall do to improve his health status by doing the workouts defined in the 'Workout Workflow'.


        `,
        actions: []
    },
    'Analytics Workflow': {
        workContext: `
Current system date is ${currentDate.toISOString()}.

Human: Listen carefully to my instruction.  Do not invent info.  Modify the value of the following variables based on what I say:
metric = 'revenue', its valid values can be ['NA', 'revenue', 'unit'].  Default is 'revenue'.
group_by = 'all__c', its valid values can be one or multiple values from ['all__c', 'customer__c', 'continent__c', 'country__c', 'city__c', 'CALENDAR_MONTH(order_date__c)', 'CALENDAR_QUARTER(order_date__c)', 'CALENDAR_YEAR(order_date__c)', 'product_cat__c'], Default is 'all__c'.
customer = 'NA', its valid value can be any of the company name, Default is 'NA'.
continent = 'NA', its valid value can be any continent, Default is 'NA'.  continent contain multiple countries
country = 'NA', its valid value can be any country, Default is 'NA'.  countries can contains multiple cities.
city = 'NA', its valid value can be any city, Default is 'NA'.
product_cat = 'NA', its valid values can be ['NA', 'shoes', 'handbags', 'cars'], Default is 'NA'.
start_date = 'NA', its valid value can be any date, the start_date format is 'yyyy-mm-dd', Default is 'NA'.
end_date = 'NA', its valid value can be any date, the end_date format is 'yyyy-mm-dd', Default is 'NA'.

If you don't find anything I said matching the variables, keep the existing value unchanged
If the value that I mention doesn't fall into the range of valid value, also keep the existing value unchanged
If you find anything I mentioned matching the variables, change the value based on what I said
If I ask you to forget, or reset the variable, set its value to 'NA'

Try to apply the An OLAP cube concept when changing the parameters.

An OLAP cube is a multi-dimensional array of data. Online analytical processing (OLAP) is a computer-based technique of analyzing data to look for insights. The term cube here refers to a multi-dimensional dataset, which is also sometimes called a hypercube if the number of dimensions is greater than three.

Terminology:

A cube can be considered a multi-dimensional generalization of a two- or three-dimensional spreadsheet. For example, a company might wish to summarize financial data by product, by time-period, and by city to compare actual and budget expenses. Product, time, city and scenario (actual and budget) are the data's dimensions.

Cube is a shorthand for multidimensional dataset, given that data can have an arbitrary number of dimensions. The term hypercube is sometimes used, especially for data with more than three dimensions. A cube is not a "cube" in the strict mathematical sense, as the sides are not all necessarily equal. But this term is used widely.

A Slice is a term for a subset of the data, generated by picking a value for one dimension and only showing the data for that value (for instance only the data at one point in time). Spreadsheets are only 2-dimensional, so by (continued) slicing or other techniques, it becomes possible to visualize multidimensional data in them.

Each cell of the cube holds a number that represents some measure of the business, such as sales, profits, expenses, budget and forecast.

OLAP data is typically stored in a star schema or snowflake schema in a relational data warehouse or in a special-purpose data management system. Measures are derived from the records in the fact table and dimensions are derived from the dimension tables.

Note: If there are multiple group_by criteria, remove 'all_c' if any.

After each question, Reply in this format:

\`
Parameters Start
metric=<metric>
group_by=<group_by>
customer=<customer>
continent=<continent>
country=<country>
city=<city>
product_cat=<product_cat>
start_date=<start_date>
end_date=<end_date>
\`

if you cannot find any match, clarify with the user.

`,
        actions: [(answerText, callback) => {
            console.log('sky debug 4001 answerText is ', answerText);

            const formattedText = answerText;
            if (callback) {
                callback(formattedText)
            }
        }]
    },
    'Workout Workflow': {
        workContext: `

There are 3 kinds of workout user can perform.  There are dependencies between the workouts.

The workout have 3 status, 'Not Started', 'In Progress', and 'Completed'.  Default status is 'Not Started'

User cannot start the next workout until the dependent workout is completed.  If there is no dependency, user can start that work out any time.

# Running

Run for 1 hour.

Dependent on: N/A

# Pushups

Do 100 push ups.

Dependent on: Swimming

# Swimming

Swim for 30 mins.

Dependent on: Running


Please note that default status is 'Not Started'


        `,
        actions: [(answerText, callback) => {
            console.log('sky debug 4001 answerText is ', answerText);

            const formattedText = answerText;
            if (callback) {
                callback(formattedText)
            }
        }]
    },
}

export default workTemplates;