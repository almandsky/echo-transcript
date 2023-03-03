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
Human: Listen carefully to my instruction.  Do not invent info.  Modify the value of the following variables based on what I say:
metric = 'revenue', its valid values can be ['NA', 'revenue', 'unit'].  Default is 'revenue'.
group_by = 'city__c', its valid values can be ['customer__c', 'city__c', 'CALENDAR_MONTH()', 'CALENDAR_QUARTER()', 'CALENDAR_YEAR()', 'product__c'], Default is 'city__c'.
customer = 'NA', its valid value can be any of the company name, Default is 'NA'.
location = 'NA', its valid value can be any city name, Default is 'NA'.
product_cat = 'NA', its valid values can be ['NA', 'shoes', 'handbags', 'cars'], Default is 'NA'.
start_date = 'NA', its valid value can be any date, the start_date format is 'yyyy-mm-dd', Default is 'NA'.

If you don't find anything I said matching the variables, keep the existing value unchanged
If the value that I mention doesn't fall into the range of valid value, also keep the existing value unchanged
If you find anything I mentioned matching the variables, change the value based on what I said
If I ask you to forget, or reset the variable, set its value to 'NA'

After each question, Reply in this format:

\` show(metric=<metric>, group_by=<group_by>, customer=<customer>, location=<location>, product_cat=<product_cat>, start_date=<start_date>) \`

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

# Jobs to be done

## Job 1

### Description

Job 1 is to run for 1 hour.

### NextJob

NextJob: Job 3

### Dependency

N/A

Need to complete Job 1 first.

## Job 2

### Description

Job 2 is to do 100 push ups.

### NextJob

NextJob: N/A

### Dependency

Cannot start Job 2 before Job 1 and Job 3 are completed.

All the jobs completed.

## Job 3

### Description

Job 3 is to swim for 30 mins.

### NextJob

NextJob: Job 2

### Dependency

Cannot start Job 2 before Job 1 is completed.

# Job Status

## Available Job Status

There are 2 job status: 'Not Started', 'Completed'.


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