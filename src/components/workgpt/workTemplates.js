const currentDate = new Date();
import { HOME_FLOW, SALES_FLOW, SERVICES_FLOW } from '../common/constants';

const workTemplates = {
    [HOME_FLOW]: {
        workContext: `
# Instruction

This is the top level workflow, which we can see all the workflows that can perform below.

If you cannot find any workflow match, come back to this 'Home', and ask what to do next.

## Available Workflows

The list of available workflows are listed below.

### Home

'Home' is the entry point.  If you cannot find any matching workflow, come back to this 'Home'.

### Sales

'Sales' is the workflow to define the the report parameters.  If Human want to know more about the Revenue and business related info, go to this 'Sales'.

### Services

'Services' is to help to keep track of the service cases status.  It will guide the 'Human' on what he shall do to follow up with the not yet closed status in 'Services'.


        `,
        actions: []
    },
    [SALES_FLOW]: {
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
order_by = 'NA', its valid values can be one or multiple values from ['CALENDAR_MONTH(order_date__c)', 'CALENDAR_QUARTER(order_date__c)', 'CALENDAR_YEAR(order_date__c)'].  if there is any date or time related criteria in group_by, please add the corresponding order_by values.

If you don't find anything I said matching the variables, keep the existing value unchanged
If the value that I mention doesn't fall into the range of valid value, also keep the existing value unchanged
If you find anything I mentioned matching the variables, change the value based on what I said
If I ask you to forget, or reset the variable, set its value to 'NA'

Note: If there are multiple group_by criteria, remove 'all_c' if any.
Note: continent, country and city are same dimension.  So one of it shall be in the group_by criteria when user rotate the group_by.
Note: if there is any date or time related criteria in group_by, please add that criteria
Note: for the group_by values, If there are date range in the where condition, and the range is within the group_by date related value, remove that date related value in group_by and order_by.
  for examples:
    - if start_date and end_date is within one year, remove 'CALENDAR_YEAR(order_date__c)' in the group_by and order_by, if any.  
    - If start_date and end_date is within one quarter, remove 'CALENDAR_YEAR(order_date__c)' and 'CALENDAR_QUARTER(order_date__c)' in the group_by and order_by, if any.  
    - If start_date and end_date is within one month, remove 'CALENDAR_YEAR(order_date__c)', 'CALENDAR_QUARTER(order_date__c)', and 'CALENDAR_MONTH(order_date__c)' in the group_by and order_by, if any.  



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
order_by=<order_by>
\`

if you cannot find any match, clarify with the user.

`,
        actions: [(answerText, callback) => {
            const formattedText = answerText;
            if (callback) {
                callback(formattedText)
            }
        }]
    },
    [SERVICES_FLOW]: {
        workContext: `

There are service cases that exists in the system.

Each case has a Owner value.  It can be assigned to a case owner.

The case have 4 status value, 'New', 'Escalated', 'On Hold' 'Closed'.  Default status is 'New'.
The case have 2 priority value, 'Low' and 'High'.  Default status is 'Low'.
Besides the above two fields, The Case have Case Number, Subject, CreatedDate and Owner field.

Current user: Sky

Here are the list of cases:

CaseNumber,Subject,Status,Priority,CreatedDate,Owner
1000,Sample Case: Our Widgets have not been delivered.,Escalated,High,"10/15/2022, 9:57 AM",Sky
1001,Sample Case 2: The widgets we received are the wrong size.,New,High,"10/15/2022, 9:57 AM",Amy
1002,Sample Case 3: Cannot track our order.,On Hold,Low,"10/15/2022, 9:57 AM",Tony
1007,Sample Case 4: Cannot open my order,Closed,High,"10/15/2022, 11:34 AM",Sky
1008,Sample Case 3: Order not found,New,High,"10/15/2022, 11:34 AM",Sky


Actions user can perform:

For the case status that is NOT 'Closed', user can add reminder to keep track of outstanding actions that is corresponding to the case.  

Once all the actions are completed, user can close the case.

        `,
        actions: [(answerText, callback) => {
            const formattedText = answerText;
            if (callback) {
                callback(formattedText)
            }
        }]
    },
}

export default workTemplates;