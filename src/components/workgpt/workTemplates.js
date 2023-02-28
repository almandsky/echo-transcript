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
        <div class="container" data-name="content"><a name="meta_report" data-id=""><!-- --></a><h1 class="helpHead1"><span class="ph" id="topic-title"><a name="topic-title" data-id=""><!-- --></a>Report</span></h1><div class="body refbody">
<div class="shortdesc">
<span class="ph" id="report_shortdesc"><a name="report_shortdesc" data-id=""><!-- --></a>Represents a custom report.</span> This metadata type only
        supports custom reports; standard reports are not supported.</div>

        <div class="section">
            <div class="box message confirm"><doc-content-callout><p>Where possible, we changed noninclusive terms to align with our
                company value of Equality. We maintained certain terms to avoid any effect on
                customer implementations.</p></doc-content-callout></div>

        </div>

        <div class="section">
            <p class="p">This type extends the <a class="xref" href="/docs/atlas.en-us.api_meta.meta/api_meta/metadata.htm" title="This is the base class for all metadata types. You cannot edit this object. A component is an instance of a metadata type." data-id="docs/atlas.en-us.api_meta.meta/api_meta/metadata.htm">Metadata</a>
                metadata type and inherits its <span class="keyword parmname">fullName</span> field.</p>

        </div>

        <div class="section">
        </div>

        <div class="section">
<h2 class="helpHead2">Declarative Metadata File Suffix and Directory Location</h2>

            
            <p class="p">Reports are stored in the <span class="ph filepath">reports</span> directory of the corresponding
                package directory. The file name matches the report title and the extension is
                    <span class="ph filepath">.report</span>.</p>

        </div>

        <div class="section">
<h2 class="helpHead2">Retrieving Reports</h2>

            
            <p class="p">You can’t use the wildcard (*) symbol with reports in
                    <span class="ph filepath">package.xml</span>. To retrieve the list of reports for populating
                    <span class="ph filepath">package.xml</span> with explicit names, call <samp class="codeph nolang">listMetadata()</samp> and pass in <samp class="codeph nolang">ReportFolder</samp> as the type. Note that ReportFolder is
                not returned as a type in<samp class="codeph nolang">describeMetadata()</samp>.
                Report is returnedfrom <samp class="codeph nolang">describeMetadata()</samp> with
                an associated attribute of <samp class="codeph nolang">inFolder</samp> set to
                true. If that attribute is set to true, you can construct the type by using the
                component name with the word Folder, such as ReportFolder.</p>

            <p class="p">The following example shows folders in <span class="ph filepath">package.xml</span>:</p>

            <div class="codeSection xml" lwc:dom="manual"><dx-code-block></dx-code-block></div>

        </div>

        <div class="section">
<h2 class="helpHead2">Version</h2>

            
            <p class="p">Report components are available in API version 14.0 and later.</p>

        </div>

        <div class="section">
<h2 class="helpHead2">Fields</h2>

            
            <p class="p">The following information assumes that you are familiar with creating and running
                reports. For more information on these fields, see “Create a Report”
                in the Salesforce online help.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e158">Field</th>

                            <th class="featureTableHeader  " id="d572643e161">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e164">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">aggregates</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportAggregate">ReportAggregate</a>[]</td>

                            <td class="entry" headers="d572643e164" data-title="Description">List that defines custom summary formulas for summary, matrix,
                                and joined reports. </td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname" id="block"><a name="block" data-id=""><!-- --></a>block</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#" title="Represents a custom report. This metadata type only supports custom reports; standard reports are not supported.">Report</a>[]</td>

                            <td class="entry" headers="d572643e164" data-title="Description"><span class="ph" id="block_desc"><a name="block_desc" data-id=""><!-- --></a>Represents each block in a joined report
                                    where every block can be of a different report
                                type.</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname" id="blockInfo"><a name="blockInfo" data-id=""><!-- --></a>blockInfo</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type"><a class="xref" href="#ReportBlockInfo">ReportBlockInfo</a></td>

                            <td class="entry" headers="d572643e164" data-title="Description"><span class="ph" id="blockInfo_desc"><a name="blockInfo_desc" data-id=""><!-- --></a>Defines attributes for each block in a
                                    joined report.</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">buckets</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportBucketField">ReportBucketField</a>[]</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Defines a bucket field to be used in the report. This field is
                                available in API version 24.0 and later.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">chart</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type"><a class="xref" href="#ReportChart">ReportChart</a></td>

                            <td class="entry" headers="d572643e164" data-title="Description">Defines a chart for summary and matrix reports .</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">colorRanges</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportColorRange">ReportColorRange</a>[]</td>

                            <td class="entry" headers="d572643e164" data-title="Description">List that specifies conditional highlighting for report summary
                                data. Salesforce Classic only.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">columns</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportColumn">ReportColumn</a>[]</td>

                            <td class="entry" headers="d572643e164" data-title="Description">List that specifies the fields displayed in the report. Fields
                                appear in the report in the same order as they appear in the
                                Metadata API file.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">crossFilters</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportCrossFilter">ReportCrossFilter</a>[]</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Defines a cross filter's object, related object, and condition
                                (WITH or WITHOUT). This field is available in API version 57.0 and later.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">currency</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<span class="keyword parmname">CurrencyIsoCode</span> (enumeration of type
                                string)</td>

                            <td class="entry" headers="d572643e164" data-title="Description">When using multiple currencies, some reports allow you to display
                                converted amounts by selecting the appropriate column to display.
                                For example, in opportunity reports, you can include the Amount
                                (converted) column on the report. This field is an enumeration of
                                type string that defines the currency in which to display converted
                                amounts. Valid values: Must be one of the valid alphabetic,
                                three-letter currency ISO codes defined by the ISO 4217 standard,
                                such as <samp class="codeph nolang">USD</samp>, <samp class="codeph nolang">GBP</samp><samp class="codeph nolang">SLE</samp>, or <samp class="codeph nolang">JPY</samp>.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">dataCategoryFilters</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Specifies a filter according to data category.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">description</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Specifies a general description, which is displayed with the
                                report name. Maximum characters: 255 characters.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname" id="field_division"><a name="field_division" data-id=""><!-- --></a>division</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<span class="ph" id="field_division_desc"><a name="field_division_desc" data-id=""><!-- --></a>If your organization uses divisions
                                    to segment data and you have the “Affected by
                                    Divisions” permission, records in the report must match
                                    this division.</span><p class="p">This field is available in API version
                                    17.0 and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">filter</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type"><a class="xref" href="#ReportFilter">ReportFilter</a></td>

                            <td class="entry" headers="d572643e164" data-title="Description">Limits report results to records with specific data. For example,
                                you can limit report results to opportunities for which the amount
                                is greater than
                                $1,000:<div class="codeSection xml" lwc:dom="manual"><dx-code-block></dx-code-block></div>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname" id="report_folderName"><a name="report_folderName" data-id=""><!-- --></a>folderName</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<span class="ph" id="report_folderName_desc"><a name="report_folderName_desc" data-id=""><!-- --></a>Name of the folder that houses
                                    the report.</span><p class="p">This field is available in API version 35.0
                                    and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">format</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportFormat">ReportFormat</a> (enumeration of type
                                string)</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Defines the report format. For example, <samp class="codeph nolang">Tabular</samp> for a simple data list
                                without subtotals.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">formattingRules</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportFormattingRule">ReportFormattingRule[]</a> (enumeration
                                of type string)</td>

                            <td class="entry" headers="d572643e164" data-title="Description">List that specifies conditional highlighting for report data.
                                Lightning Experience only.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">groupingsAcross</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportGrouping">ReportGrouping</a>[]</td>

                            <td class="entry" headers="d572643e164" data-title="Description">List that defines the fields by which you want to group and
                                subtotal data across a matrix report (row headings). When grouping
                                by a date field, you can further group the data by a specific time
                                period such as days, weeks, or months. Maximum: 2 fields.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">groupingsDown</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportGrouping">ReportGrouping</a>[]</td>

                            <td class="entry" headers="d572643e164" data-title="Description">For Summary and Matrix reports: List that defines the fields by
                                which you want to group and subtotal. For summary reports, choosing
                                more than one sort field allows you to subsort your data. For matrix
                                reports, specifies summary fields for column headings. When grouping
                                by a date field, you can further group the data by a specific time
                                period such as days, weeks, or months. Maximum for matrix reports:
                                2. Maximum for summary reports: 3</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">historicalSelector</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type"><a class="xref" href="#ReportHistoricalSelector">ReportHistoricalSelector</a></td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<span class="ph" id="historicalselector_desc"><a name="historicalselector_desc" data-id=""><!-- --></a>Defines a date range for which
                                    historical trend reporting data is to be captured. Default is
                                    “Any Historical Date.” </span><p class="p">Available in API
                                    version 29.0 and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">name</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Required. The report name. For example, <samp class="codeph nolang">Opportunity Pipeline</samp>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">numSubscriptions</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">int</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<span class="ph" id="numSubscriptions_desc"><a name="numSubscriptions_desc" data-id=""><!-- --></a>Indicates whether a user has
                                    subscribed to this report Lightning Experience (1) or not (0).
                                    Tied to user context.</span><p class="p">This field is available in API
                                    version 38.0 and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">params</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#ReportParam">ReportParam</a>[]</td>

                            <td class="entry" headers="d572643e164" data-title="Description">List that specifies settings specific to each report type, in
                                particular options that let you filter a report to obtain useful
                                subsets. For example, the Activities report type lets you specify
                                whether you want to see open or closed activities or both and
                                whether you want to see tasks or events or both. Valid values depend
                                on the report type.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="ph" id="reportCustomDetailFormula"><a name="reportCustomDetailFormula" data-id=""><!-- --></a><span class="keyword parmname">reportCustomDetailFormula</span></span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
                                <a class="xref" href="#CustomDetailFormulas">CustomDetailFormulas</a>
</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Allows you to apply row-level formulas to reports. </td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname" id="reporttype"><a name="reporttype" data-id=""><!-- --></a>reportType</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Required. Defines the type of data in the report. For example,
                                    <samp class="codeph xml">Opportunity</samp> to create a report
                                of opportunities data.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname" id="field_roleHierarchyFilter"><a name="field_roleHierarchyFilter" data-id=""><!-- --></a>roleHierarchyFilter</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<span class="ph" id="field_roleHierarchyFilter_desc"><a name="field_roleHierarchyFilter_desc" data-id=""><!-- --></a>The role name for a
                                    report drill down. Some reports, such as opportunity and
                                    activity reports, display Hierarchy links that allow you to
                                    drill down to different data sets based on the role
                                    hierarchy.</span><p class="p">This field is available in API version 17.0
                                    and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">rowLimit</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">int</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Defines the maximum number of rows that can be returned for the
                                report.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">scope</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Defines the scope of data on which you run the report. For
                                example, whether you want to run the report against all
                                opportunities, opportunities you own, or opportunities your team
                                owns. Valid values depend on the <span class="keyword parmname">reportType</span>.
                                For example, for Accounts reports:<ul class="ul bulletList">
                                    <li class="li"><samp class="codeph nolang">MyAccounts</samp></li>

                                    <li class="li"><samp class="codeph nolang">MyTeamsAccounts</samp></li>

                                    <li class="li"><samp class="codeph nolang">AllAccounts</samp></li>

                                </ul>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">showCurrentDate</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<span class="ph" id="showcurrentdate_desc"><a name="showcurrentdate_desc" data-id=""><!-- --></a>Can be set to <samp class="codeph java">true</samp> for historical trending
                                    reports in matrix format.</span><p class="p">Available in API version 29.0
                                    and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">showDetails</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<samp class="codeph java">false</samp> shows a collapsed view
                                of the report with only the headings, subtotals, and total. Default:
                                    <samp class="codeph java">true</samp>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">showGrandTotal</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<samp class="codeph java">true</samp> displays the calculated
                                total for the full report.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">showSubTotals</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<samp class="codeph java">true</samp> displays the calculated
                                subtotals for sections of the report.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="ph" id="sortcol"><a name="sortcol" data-id=""><!-- --></a><span class="keyword parmname">sortColumn</span></span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Specifies the field on which to sort data in the report. Use
                                    <span class="keyword parmname">sortOrder</span> to specify the sort
                                order.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="ph" id="SortOrder_field"><a name="SortOrder_field" data-id=""><!-- --></a><span class="keyword parmname">sortOrder</span></span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">
<a class="xref" href="#SortOrder">SortOrder</a>
                                (enumeration of type string)</td>

                            <td class="entry" headers="d572643e164" data-title="Description">Specifies the sort order. Use <span class="keyword parmname">sortColumn</span> to
                                specify the field on which to sort.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname" id="field_territoryHierarchyFilter"><a name="field_territoryHierarchyFilter" data-id=""><!-- --></a>territoryHierarchyFilter</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<span class="ph" id="field_territoryHierarchyFilter_desc"><a name="field_territoryHierarchyFilter_desc" data-id=""><!-- --></a>The territory name
                                    for a report drill down. If your organization uses territory
                                    management, some reports display Hierarchy links that allow you
                                    to drill down to different data sets based on the territory
                                    hierarchy.</span><p class="p">This field is available in API version 17.0
                                    and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname">timeFrameFilter</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type"><a class="xref" href="#ReportTimeFrameFilter">ReportTimeFrameFilter</a></td>

                            <td class="entry" headers="d572643e164" data-title="Description">Limits report results to records within a specified time
                                frame.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e158" data-title="Field"><span class="keyword parmname" id="field_userFilter"><a name="field_userFilter" data-id=""><!-- --></a>userFilter</span></td>

                            <td class="entry" headers="d572643e161" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e164" data-title="Description">
<span class="ph" id="field_userFilter_desc"><a name="field_userFilter_desc" data-id=""><!-- --></a>The user name for a report drill
                                    down. Some reports, such as opportunity and activity reports,
                                    display Hierarchy links that allow you to drill down to
                                    different data sets based on the user hierarchy.</span><p class="p">This
                                    field is available in API version 17.0 and later.</p>
</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportAggregate">
<a name="ReportAggregate" data-id=""><!-- --></a><h2 class="helpHead2">ReportAggregate</h2>

            
            <p class="p">ReportAggregate defines custom summary formulas on summary, matrix, and joined
                reports. For more information on these fields, see “Add a Summary Formula
                Column to a Report” in the Salesforce online help.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e814">Field</th>

                            <th class="featureTableHeader  " id="d572643e817">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e820">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">acrossGroupingContext</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e820" data-title="Description">Defines the row grouping level at which you want your custom
                                summary formula to be displayed. This is a new field in API version
                                15.0.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">calculatedFormula</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e820" data-title="Description">Required. The custom summary formula. For example, <samp class="codeph xml">AMOUNT:SUM + OPP_QUANTITY:SUM</samp>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">datatype</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">
<a class="xref" href="#ReportAggregateDatatype">ReportAggregateDatatype</a> (enumeration
                                of type string)</td>

                            <td class="entry" headers="d572643e820" data-title="Description">Required. Specifies the data type for formatting and display of
                                the custom summary formula results.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">description</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e820" data-title="Description">The custom summary formula description. Maximum: 255
                                characters.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">developerName</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e820" data-title="Description">Required. The internal development name of the custom summary
                                formula, for example, <samp class="codeph nolang">FORMULA1</samp>.
                                This is used to reference custom summary formulas from other report
                                components, including conditional highlighting.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">downGroupingContext</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e820" data-title="Description">Defines the column grouping level at which you want your custom
                                summary formula to be displayed. This field is available in API
                                version 15.0 and later.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">isActive</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e820" data-title="Description">Required. <samp class="codeph java">true</samp> displays the
                                formula result in the report. <samp class="codeph java">false</samp> does not display the result in the
                                report.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">isCrossBlock</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e820" data-title="Description">
<span class="ph" id="isCrossBlockDef"><a name="isCrossBlockDef" data-id=""><!-- --></a>Determines whether the custom summary
                                    formula is a cross-block formula, which is available with joined
                                    reports. <samp class="codeph java">true</samp> indicates a
                                    cross-block custom summary formula. <samp class="codeph java">false</samp> indicates a standard custom summary
                                    formula.</span><p class="p">This field is available in API version 25.0 and
                                    later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">masterLabel</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e820" data-title="Description">Required. The custom summary formula label (name). </td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname" id="reportType"><a name="reportType" data-id=""><!-- --></a>reportType</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e820" data-title="Description">
<span class="ph" id="reportType_desc"><a name="reportType_desc" data-id=""><!-- --></a>Required for joined reports. Specifies
                                    the <span class="keyword parmname">reportType</span> of the blocks to which the
                                        <span class="keyword parmname">aggregate</span> can be added.</span>
                            </td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e814" data-title="Field"><span class="keyword parmname">scale</span></td>

                            <td class="entry" headers="d572643e817" data-title="Field Type">int</td>

                            <td class="entry" headers="d572643e820" data-title="Description">The formula result is calculated to the specified number of
                                decimal places. Valid values <samp class="codeph nolang">0</samp>
                                through <samp class="codeph nolang">18</samp>.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportBlockInfo">
<a name="ReportBlockInfo" data-id=""><!-- --></a><h2 class="helpHead2">ReportBlockInfo</h2>

            
            <p class="p">ReportBlockInfo defines blocks in a joined report.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1034">Field</th>

                            <th class="featureTableHeader  " id="d572643e1037">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e1040">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e1034" data-title="Field"><span class="keyword parmname">aggregateReferences</span></td>

                            <td class="entry" headers="d572643e1037" data-title="Field Type">
<a class="xref" href="#ReportAggregateReference">ReportAggregateReference</a>[]</td>

                            <td class="entry" headers="d572643e1040" data-title="Description">Lists the <span class="keyword parmname">aggregates</span> that represent the
                                custom summary formulas used in a joined report block. </td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1034" data-title="Field"><span class="keyword parmname">blockId</span></td>

                            <td class="entry" headers="d572643e1037" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1040" data-title="Description">
<span class="ph" id="blockIDDef"><a name="blockIDDef" data-id=""><!-- --></a>Required. <span class="keyword parmname">blockId</span> is
                                    used in cross-block custom summary formulas and joined report
                                    charts to identify the block containing each summary field.
                                        <span class="keyword parmname">blockId</span> is assigned automatically.
                                    Valid values are B1 through B5. </span><p class="p">This field is available
                                    in API version 25.0 and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1034" data-title="Field"><span class="keyword parmname">joinTable</span></td>

                            <td class="entry" headers="d572643e1037" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1040" data-title="Description">Required. Refers to the entity used to join blocks in a joined
                                report. The entity provides a list of fields that are available for
                                globally grouping across the blocks.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportAggregateReference">
<a name="ReportAggregateReference" data-id=""><!-- --></a><h2 class="helpHead2">ReportAggregateReference</h2>

            
            <p class="p">ReportAggregateReference defines the developer name used for custom summary formulas
                in joined reports.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1127">Field</th>

                            <th class="featureTableHeader  " id="d572643e1130">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e1133">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e1127" data-title="Field"><span class="keyword parmname" id="Aggregate"><a name="Aggregate" data-id=""><!-- --></a>aggregate</span></td>

                            <td class="entry" headers="d572643e1130" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1133" data-title="Description">Required. The <span class="keyword parmname">developerName</span> of the
                                ReportAggregate, which specifies the custom summary formula used in
                                a block of a joined report.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportBucketField">
<a name="ReportBucketField" data-id=""><!-- --></a><h2 class="helpHead2">ReportBucketField</h2>

            
            <p class="p">ReportBucketField defines a bucket to be used in the report.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1182">Field</th>

                            <th class="featureTableHeader  " id="d572643e1185">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e1188">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e1182" data-title="Field"><span class="keyword parmname">bucketType</span></td>

                            <td class="entry" headers="d572643e1185" data-title="Field Type">ReportBucketFieldType (enumeration of type string)</td>

                            <td class="entry" headers="d572643e1188" data-title="Description">Required. Specifies the type of bucket. Valid values:<ul class="ul bulletList">
                                    <li class="li">text</li>

                                    <li class="li">number</li>

                                    <li class="li">picklist</li>

                                </ul>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1182" data-title="Field"><span class="keyword parmname">developerName</span></td>

                            <td class="entry" headers="d572643e1185" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1188" data-title="Description">Required. A unique name used as the <samp class="codeph xml"><span class="tag">&lt;field</span>&gt;</samp> value to display a bucket field in the
                                column list and other report components, including sort, filter,
                                list, group, and chart. Must be of the format <samp class="codeph nolang">BucketField_<var class="keyword varname">name</var></samp>. For example, <samp class="codeph nolang">BucketField_BusinessSize</samp>.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1182" data-title="Field"><span class="keyword parmname">masterLabel</span></td>

                            <td class="entry" headers="d572643e1185" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1188" data-title="Description">Required. The bucket field label. Maximum 40 characters. Any line
                                breaks, tabs, or multiple spaces at the beginning or end of the
                                label are removed. Any of these characters within the label are
                                reduced to a single space.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1182" data-title="Field"><span class="keyword parmname">nullTreatment</span></td>

                            <td class="entry" headers="d572643e1185" data-title="Field Type">ReportBucketFieldNullTreatment (enumeration of type
                                string)</td>

                            <td class="entry" headers="d572643e1188" data-title="Description">For numeric bucket fields only. Specifies whether empty values
                                are treated as zeros (<samp class="codeph nolang">z</samp>) or not
                                    (<samp class="codeph nolang">n</samp>).</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1182" data-title="Field"><span class="keyword parmname">otherBucketLabel</span></td>

                            <td class="entry" headers="d572643e1185" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1188" data-title="Description">The label of the container for unbucketed values.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1182" data-title="Field"><span class="keyword parmname">sourceColumnName</span></td>

                            <td class="entry" headers="d572643e1185" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1188" data-title="Description">Required. The source field that the bucket is applied to. For
                                example, <samp class="codeph nolang">SALES</samp> or <samp class="codeph nolang">INDUSTRY</samp>.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1182" data-title="Field"><span class="keyword parmname" id="BucketFieldValues"><a name="BucketFieldValues" data-id=""><!-- --></a>values</span></td>

                            <td class="entry" headers="d572643e1185" data-title="Field Type">
<a class="xref" href="#ReportBucketFieldValue">ReportBucketFieldValue</a>
                                (enumeration of type string)</td>

                            <td class="entry" headers="d572643e1188" data-title="Description">Defines one bucket value used in the bucket field. <div class="box message info"><doc-content-callout><p>While
                                    this name is plural, it represents a single bucket. In typical
                                    use, a bucket field contains multiple buckets.</p></doc-content-callout></div>
</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportBucketFieldValue">
<a name="ReportBucketFieldValue" data-id=""><!-- --></a><h2 class="helpHead2">ReportBucketFieldValue</h2>

            
            <p class="p">ReportBucketFieldValue defines a bucket value used in the bucket field.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1353">Field</th>

                            <th class="featureTableHeader  " id="d572643e1356">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e1359">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e1353" data-title="Field"><span class="keyword parmname">sourceValues</span></td>

                            <td class="entry" headers="d572643e1356" data-title="Field Type">ReportBucketFieldSourceValue (enumeration of type string)</td>

                            <td class="entry" headers="d572643e1359" data-title="Description">The value of a bucket in the bucket field. Valid values:<ul class="ul bulletList">
                                    <li class="li">
<samp class="codeph nolang">sourceValue</samp>—Used
                                        for picklist and text bucket fields. For picklists,
                                        describes the picklist item in the bucket. For example, the
                                        sourceValue of a bucket on <samp class="codeph nolang">TYPE</samp> could be <samp class="codeph nolang">Customer</samp>. For text, the full string for the
                                        item in the bucket. For example, the sourceValue of a bucket
                                        on <samp class="codeph nolang">ADDRESS_STATE1</samp> could
                                        be <samp class="codeph nolang">NY</samp>.</li>

                                    <li class="li">
<samp class="codeph nolang">from</samp>—Used only
                                        on numeric bucket fields. A non-inclusive lower bound for a
                                        numeric bucket range. This value must be a number.</li>

                                    <li class="li">
<samp class="codeph nolang">to</samp>—Used only on
                                        numeric bucket fields. The inclusive upper bound for a
                                        numeric bucket range. This value must be a number.</li>

                                </ul>
<p class="p">In numeric buckets, the first value must only have <samp class="codeph nolang">to</samp> and last value must only
                                    have <samp class="codeph nolang">from</samp>. All other values
                                    must have both <samp class="codeph nolang">to</samp> and
                                        <samp class="codeph nolang">from</samp>.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1353" data-title="Field"><span class="keyword parmname">value</span></td>

                            <td class="entry" headers="d572643e1356" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1359" data-title="Description">Required. The name of a specific bucket value within the bucket
                                field.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportGrouping">
<a name="ReportGrouping" data-id=""><!-- --></a><h2 class="helpHead2">ReportGrouping</h2>

            
            <p class="p">ReportGrouping defines how to group, subtotal, and sort data for summary, matrix, and
                joined reports. </p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1461">Field</th>

                            <th class="featureTableHeader  " id="d572643e1464">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e1467">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e1461" data-title="Field"><span class="keyword parmname" id="aggregatetype"><a name="aggregatetype" data-id=""><!-- --></a>aggregateType</span></td>

                            <td class="entry" headers="d572643e1464" data-title="Field Type">ReportAggrType (enumeration of type string) </td>

                            <td class="entry" headers="d572643e1467" data-title="Description">
<span class="ph" id="aggregateTypeDesc"><a name="aggregateTypeDesc" data-id=""><!-- --></a>The type of aggregate value to sort
                                    by.</span> Valid values are:<a name="aggregateTypeValues" data-id=""><!-- --></a><ul class="ul bulletList" id="aggregateTypeValues">
                                    <li class="li"><samp class="codeph nolang">Sum</samp></li>

                                    <li class="li"><samp class="codeph nolang">Average</samp></li>

                                    <li class="li"><samp class="codeph nolang">Maximum</samp></li>

                                    <li class="li"><samp class="codeph nolang">Minimum</samp></li>

                                    <li class="li"><samp class="codeph nolang">RowCount</samp></li>

                                    <li class="li"><samp class="codeph nolang">Unique</samp></li>

                                </ul>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1461" data-title="Field"><span class="keyword parmname">dateGranularity</span></td>

                            <td class="entry" headers="d572643e1464" data-title="Field Type">
<a class="xref" href="#UserDateGranularity">UserDateGranularity</a> (enumeration of
                                type string)</td>

                            <td class="entry" headers="d572643e1467" data-title="Description">When grouping by a date field, the time period by which to
                                group.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1461" data-title="Field"><span class="keyword parmname">field</span></td>

                            <td class="entry" headers="d572643e1464" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1467" data-title="Description">Required. The field by which you want to summarize data. For
                                example, <samp class="codeph nolang">CAMPAIGN_SOURCE</samp>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1461" data-title="Field"><span class="keyword parmname">sortByName</span></td>

                            <td class="entry" headers="d572643e1464" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1467" data-title="Description">The API name of the column, aggregate or custom summary field
                                used to order the grouping.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1461" data-title="Field"><span class="keyword parmname">sortOrder</span></td>

                            <td class="entry" headers="d572643e1464" data-title="Field Type"><a class="xref" href="#SortOrder">SortOrder</a></td>

                            <td class="entry" headers="d572643e1467" data-title="Description">Required. Whether to sort data in ascending or descending
                                alphabetical and numerical order.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1461" data-title="Field"><span class="keyword parmname">sortType</span></td>

                            <td class="entry" headers="d572643e1464" data-title="Field Type">ReportSortType (enumeration of type string)</td>

                            <td class="entry" headers="d572643e1467" data-title="Description">
<span class="ph" id="sortTypeDesc"><a name="sortTypeDesc" data-id=""><!-- --></a>Indicates if the grouping is sorted by a
                                    column, aggregate or custom summary field.</span> Valid values
                                    are:<a name="sortTypeValues" data-id=""><!-- --></a><ul class="ul bulletList" id="sortTypeValues">
                                    <li class="li"><samp class="codeph nolang">Column</samp></li>

                                    <li class="li"><samp class="codeph nolang">Aggregate</samp></li>

                                    <li class="li"><samp class="codeph nolang">CustomSummaryFormula</samp></li>

                                </ul>
</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportHistoricalSelector">
<a name="ReportHistoricalSelector" data-id=""><!-- --></a><h2 class="helpHead2">ReportHistoricalSelector</h2>

            
            <p class="p">ReportHistoricalSelector defines a date range for historical data. </p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1631">Field</th>

                            <th class="featureTableHeader  " id="d572643e1634">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e1637">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e1631" data-title="Field"><span class="keyword parmname">snapshot</span></td>

                            <td class="entry" headers="d572643e1634" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1637" data-title="Description">Represents the date value to apply a historical filter, either
                                relative (in the format <samp class="codeph nolang">N_DAYS_AGO:2</samp>) or absolute (in the format <samp class="codeph nolang">yyyy-MM-dd</samp>). If unspecified,
                                it’s assumed that the filter will be applied to all the
                                columns the user sees.<p class="p">Available in API version 29.0 and
                                    later.</p>
</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="CustomDetailFormulas">
<a name="CustomDetailFormulas" data-id=""><!-- --></a><h2 class="helpHead2">CustomDetailFormulas</h2>

            
            <p class="p">CustomDetailFormulas defines row-level formulas for reports.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1691">Field</th>

                            <th class="featureTableHeader  " id="d572643e1694">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e1697">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e1691" data-title="Field"><span class="keyword parmname">calculatedFormula</span></td>

                            <td class="entry" headers="d572643e1694" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1697" data-title="Description">Required. The custom formula. For example, <samp class="codeph xml">AMOUNT:SUM + OPP_QUANTITY:SUM</samp>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1691" data-title="Field"><span class="keyword parmname">datatype</span></td>

                            <td class="entry" headers="d572643e1694" data-title="Field Type">
<a class="xref" href="#ReportCustomDetailFormulaDatatype">ReportCustomDetailFormulaDatatype</a> (enumeration of type
                                string)</td>

                            <td class="entry" headers="d572643e1697" data-title="Description">Required. Specifies the data type for formatting and display of
                                the formula results.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1691" data-title="Field"><span class="keyword parmname">description</span></td>

                            <td class="entry" headers="d572643e1694" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1697" data-title="Description">The formula description. Maximum: 255 characters.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1691" data-title="Field"><span class="keyword parmname">developerName</span></td>

                            <td class="entry" headers="d572643e1694" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1697" data-title="Description">Required. The internal development name of the formula, for
                                example, <samp class="codeph nolang">FORMULA1</samp>. This is used
                                to reference custom formulas from other report components, including
                                conditional highlighting.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1691" data-title="Field"><span class="keyword parmname">label</span></td>

                            <td class="entry" headers="d572643e1694" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e1697" data-title="Description">Required. The name that identifies this formula. </td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1691" data-title="Field"><span class="keyword parmname">scale</span></td>

                            <td class="entry" headers="d572643e1694" data-title="Field Type">int</td>

                            <td class="entry" headers="d572643e1697" data-title="Description">The formula result is calculated to the specified number of
                                decimal places. Valid values <samp class="codeph nolang">0</samp>
                                through <samp class="codeph nolang">18</samp>.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportCustomDetailFormulaDatatype">
<a name="ReportCustomDetailFormulaDatatype" data-id=""><!-- --></a><h2 class="helpHead2">ReportCustomDetailFormulaDatatype</h2>

            
            <p class="p">An enumeration of type string that specifies the data type for formatting and display
                of row-level formula results. Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1819">Enumeration Value</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e1819" data-title="Enumeration Value"><span class="keyword parmname">Double</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1819" data-title="Enumeration Value"><span class="keyword parmname">DateOnly</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1819" data-title="Enumeration Value"><span class="keyword parmname">DateTime</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1819" data-title="Enumeration Value"><span class="keyword parmname">Text</span></td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="SortOrder">
<a name="SortOrder" data-id=""><!-- --></a><h2 class="helpHead2">SortOrder</h2>

            
            <p class="p">An enumeration of type string that defines the order in which data is sorted in the
                report fields. Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1878">Field</th>

                            <th class="featureTableHeader  " id="d572643e1881">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e1878" data-title="Field"><span class="keyword parmname">Asc</span></td>

                            <td class="entry" headers="d572643e1881" data-title="Description">Sorts data in ascending alphabetical and numerical order.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1878" data-title="Field"><span class="keyword parmname">Desc</span></td>

                            <td class="entry" headers="d572643e1881" data-title="Description">Sorts data in descending alphabetical and numerical
                                order.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="UserDateGranularity">
<a name="UserDateGranularity" data-id=""><!-- --></a><h2 class="helpHead2">UserDateGranularity</h2>

            
            <p class="p">An enumeration of type string that defines the time period by which to group data.
                Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e1933">Enumeration Value</th>

                            <th class="featureTableHeader  " id="d572643e1936">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">None</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">No grouping by date</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">Day</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">By day</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">Week</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">By week</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">Month</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">By month</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">Quarter</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">By quarter</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">Year</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">By year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">FiscalQuarter</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">By fiscal quarter. You can set the fiscal year for your
                                organization. See “Set the Fiscal Year” in the
                                Salesforce online help.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">FiscalYear</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">By fiscal year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">MonthInYear</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">By calendar month in year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">DayInMonth</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">By calendar day in month</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">FiscalPeriod</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">When custom fiscal years are enabled: By fiscal period </td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e1933" data-title="Enumeration Value"><span class="keyword parmname">FiscalWeek</span></td>

                            <td class="entry" headers="d572643e1936" data-title="Description">When custom fiscal years are enabled: By fiscal week</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportSummaryType">
<a name="ReportSummaryType" data-id=""><!-- --></a><h2 class="helpHead2">ReportSummaryType</h2>

            
            <p class="p">An enumeration of type string that defines how report fields are summarized. Valid
                values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e2089">Enumeration Value</th>

                            <th class="featureTableHeader  " id="d572643e2092">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e2089" data-title="Enumeration Value"><span class="keyword parmname">Sum</span></td>

                            <td class="entry" headers="d572643e2092" data-title="Description">Total</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2089" data-title="Enumeration Value"><span class="keyword parmname">Average</span></td>

                            <td class="entry" headers="d572643e2092" data-title="Description">Average</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2089" data-title="Enumeration Value"><span class="keyword parmname">Maximum</span></td>

                            <td class="entry" headers="d572643e2092" data-title="Description">Largest value</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2089" data-title="Enumeration Value"><span class="keyword parmname">Minimum</span></td>

                            <td class="entry" headers="d572643e2092" data-title="Description">Smallest value</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2089" data-title="Enumeration Value"><span class="keyword parmname">Unique</span></td>

                            <td class="entry" headers="d572643e2092" data-title="Description">Unique values</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2089" data-title="Enumeration Value"><span class="keyword parmname">None</span></td>

                            <td class="entry" headers="d572643e2092" data-title="Description">The field is not summarized.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportColorRange">
<a name="ReportColorRange" data-id=""><!-- --></a><h2 class="helpHead2">ReportColorRange</h2>

            
            <p class="p">ReportColorRange defines conditional highlighting for report summary data.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e2186">Field</th>

                            <th class="featureTableHeader  " id="d572643e2189">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e2192">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e2186" data-title="Field"><span class="keyword parmname">aggregate</span></td>

                            <td class="entry" headers="d572643e2189" data-title="Field Type">
<a class="xref" href="#ReportSummaryType">ReportSummaryType</a> (enumeration of
                                type string)</td>

                            <td class="entry" headers="d572643e2192" data-title="Description">Required. Defines how the field specified in <samp class="codeph nolang">columnName</samp> is summarized. For
                                example, <samp class="codeph nolang">Sum</samp>.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2186" data-title="Field"><span class="keyword parmname">columnName</span></td>

                            <td class="entry" headers="d572643e2189" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2192" data-title="Description">Required. Specifies the field whose value ranges are represented
                                by background colors.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2186" data-title="Field"><span class="keyword parmname">highBreakpoint</span></td>

                            <td class="entry" headers="d572643e2189" data-title="Field Type">double</td>

                            <td class="entry" headers="d572643e2192" data-title="Description">Required. Specifies the number that separates the mid color from
                                the high color.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2186" data-title="Field"><span class="keyword parmname">highColor</span></td>

                            <td class="entry" headers="d572643e2189" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2192" data-title="Description">Required. Specifies the color (in HTML format) to represent data
                                that falls into the high number range. This color spans from the
                                    <samp class="codeph nolang">highBreakpoint</samp>
                                value.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2186" data-title="Field"><span class="keyword parmname">lowBreakpoint</span></td>

                            <td class="entry" headers="d572643e2189" data-title="Field Type">double</td>

                            <td class="entry" headers="d572643e2192" data-title="Description">Required. Specifies the number that separates the low color from
                                the mid color.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2186" data-title="Field"><span class="keyword parmname">lowColor</span></td>

                            <td class="entry" headers="d572643e2189" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2192" data-title="Description">Required. Specifies a color (in HTML format) to represent data
                                that falls into the low value range, below the <samp class="codeph nolang">lowBreakpoint</samp> value.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2186" data-title="Field"><span class="keyword parmname">midColor</span></td>

                            <td class="entry" headers="d572643e2189" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2192" data-title="Description">Required. Specifies a color (in HTML format) to represent data
                                that falls into the mid value range.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportColumn">
<a name="ReportColumn" data-id=""><!-- --></a><h2 class="helpHead2">ReportColumn</h2>

            
            <p class="p">ReportColumn defines how fields (columns) are displayed in the report.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e2332">Field</th>

                            <th class="featureTableHeader  " id="d572643e2335">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e2338">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e2332" data-title="Field"><span class="keyword parmname">aggregateTypes</span></td>

                            <td class="entry" headers="d572643e2335" data-title="Field Type">
<a class="xref" href="#ReportSummaryType">ReportSummaryType</a>[] (enumeration of
                                type string)</td>

                            <td class="entry" headers="d572643e2338" data-title="Description">List that defines if and how each report field is summarized.
                            </td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2332" data-title="Field"><span class="keyword parmname">field</span></td>

                            <td class="entry" headers="d572643e2335" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2338" data-title="Description">Required. The field name. For example, <samp class="codeph nolang">AGE</samp> or <samp class="codeph nolang">OPPORTUNITY_NAME</samp>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2332" data-title="Field"><span class="keyword parmname">reverseColors</span></td>

                            <td class="entry" headers="d572643e2335" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e2338" data-title="Description">
                                <span class="ph" id="reversecolors_desc"><a name="reversecolors_desc" data-id=""><!-- --></a>In historical trend reports, displays
                                    greater Date values as green and greater Amount values as red,
                                    reversing the default colors.</span><p class="p">Available in API version
                                    29.0 and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2332" data-title="Field"><span class="keyword parmname">showChanges</span></td>

                            <td class="entry" headers="d572643e2335" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e2338" data-title="Description">
<span class="ph" id="showchanges_desc"><a name="showchanges_desc" data-id=""><!-- --></a>In historical trend reports, adds a
                                    column displaying the difference between current and historical
                                    Date and Amount values.</span>
                                <p class="p">Available in API version 29.0 and later.</p>
</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportFilter">
<a name="ReportFilter" data-id=""><!-- --></a><h2 class="helpHead2">ReportFilter</h2>

            
            <p class="p">ReportFilter limits the report results by filtering data on specified fields.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e2439">Field</th>

                            <th class="featureTableHeader  " id="d572643e2442">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e2445">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e2439" data-title="Field"><span class="keyword parmname">booleanFilter</span></td>

                            <td class="entry" headers="d572643e2442" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2445" data-title="Description">Specifies filter logic conditions.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2439" data-title="Field"><span class="keyword parmname">criteriaItems</span></td>

                            <td class="entry" headers="d572643e2442" data-title="Field Type"><a class="xref" href="#ReportFilterItem">ReportFilterItem</a></td>

                            <td class="entry" headers="d572643e2445" data-title="Description">The criteria by which you want to filter report data, either by
                                comparing historical values or by applying a date
                                range.<div class="codeSection xml" lwc:dom="manual"><dx-code-block></dx-code-block></div>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2439" data-title="Field"><span class="keyword parmname">language</span></td>

                            <td class="entry" headers="d572643e2442" data-title="Field Type">Language (enumeration of type string)</td>

                            <td class="entry" headers="d572643e2445" data-title="Description">The language used when a report filters against a picklist value
                                using the operators <samp class="codeph soql">contains</samp> or
                                    <samp class="codeph soql">startsWith</samp>. For a list of
                                valid language values, see <a class="xref" href="/docs/atlas.en-us.api_meta.meta/api_meta/meta_translations.htm" title="Metadata type that enables work with translations for various supported languages. The ability to translate component labels is part of the Translation Workbench." data-id="docs/atlas.en-us.api_meta.meta/api_meta/meta_translations.htm">Language</a>.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportFilterItem">
<a name="ReportFilterItem" data-id=""><!-- --></a><h2 class="helpHead2">ReportFilterItem</h2>

            
            <p class="p" id="ReportFilterItemDefinition"><a name="ReportFilterItemDefinition" data-id=""><!-- --></a>ReportFilterItem limits the report results by
                filtering data on specified fields.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e2536">Field</th>

                            <th class="featureTableHeader  " id="d572643e2539">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e2542">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e2536" data-title="Field"><span class="keyword parmname">column</span></td>

                            <td class="entry" headers="d572643e2539" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2542" data-title="Description">Required. The field on which you want to filter data. For
                                example, <samp class="codeph xml">AMOUNT</samp>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2536" data-title="Field"><span class="keyword parmname">columnToColumn</span></td>

                            <td class="entry" headers="d572643e2539" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e2542" data-title="Description">
                                <p class="p">Indicates whether the filter is a column-to-column
                                    (field-to-field) filter.</p>

                                <p class="p">Available in API version 29.0 and later for historical trending
                                    reports. Available in API version 48.0 and later for general
                                    reports.</p>

                            </td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2536" data-title="Field"><span class="keyword parmname">isUnlocked</span></td>

                            <td class="entry" headers="d572643e2539" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e2542" data-title="Description">Optional. Indicates whether the report filter is unlocked
                                    (<samp class="codeph java">true</samp>) or locked (<samp class="codeph java">false</samp>). You can edit unlocked filters
                                on the report run page in Lightning Experience. If unspecified, the
                                default value is <samp class="codeph java">false</samp>.<p class="p">Available in API version 38.0 and
                                later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2536" data-title="Field"><span class="keyword parmname">operator</span></td>

                            <td class="entry" headers="d572643e2539" data-title="Field Type">FilterOperation (<a class="xref" href="/docs/atlas.en-us.api_meta.meta/api_meta/meta_objects_intro.htm#enumeration_title" data-id="docs/atlas.en-us.api_meta.meta/api_meta/meta_objects_intro.htm#enumeration_title">enumeration</a> of type string)</td>

                            <td class="entry" headers="d572643e2542" data-title="Description">Required. An enumeration of type string that defines the operator
                                used to filter the data, for example, <samp class="codeph soql">greaterThan</samp>. Valid values are: <ul class="ul bulletList">
                                    <li class="li"><samp class="codeph soql">equals</samp></li>

                                    <li class="li"><samp class="codeph soql">notEqual</samp></li>

                                    <li class="li"><samp class="codeph soql">lessThan</samp></li>

                                    <li class="li"><samp class="codeph soql">greaterThan</samp></li>

                                    <li class="li"><samp class="codeph soql">lessOrEqual</samp></li>

                                    <li class="li"><samp class="codeph soql">greaterOrEqual</samp></li>

                                    <li class="li"><samp class="codeph soql">contains</samp></li>

                                    <li class="li"><samp class="codeph soql">notContain</samp></li>

                                    <li class="li"><samp class="codeph soql">startsWith</samp></li>

                                    <li class="li"><samp class="codeph soql">includes</samp></li>

                                    <li class="li"><samp class="codeph soql">excludes</samp></li>

                                    <li class="li">
<samp class="codeph soql">within</samp> (<samp class="codeph nolang">DISTANCE</samp> criteria
                                        only)</li>

                                </ul>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2536" data-title="Field"><span class="keyword parmname">snapshot</span></td>

                            <td class="entry" headers="d572643e2539" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2542" data-title="Description">Represents the date value, either relative (in the format <samp class="codeph nolang">N_DAYS_AGO:2</samp>) or absolute (in the
                                format <samp class="codeph nolang">yyyy-MM-dd</samp>).<p class="p">Available
                                    in API version 29.0 and later.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2536" data-title="Field"><span class="keyword parmname">value</span></td>

                            <td class="entry" headers="d572643e2539" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2542" data-title="Description">The value by which you want to filter the data, for example,
                                    <samp class="codeph xml">1000</samp>. Note that the Metadata
                                API filter condition values do not always match those that you enter
                                in the report wizard. For example, in the Metadata API dates are
                                always converted to the US date format and values entered in a
                                non-US English language may be converted to a standard US English
                                equivalent.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportFormat">
<a name="ReportFormat" data-id=""><!-- --></a><h2 class="helpHead2">ReportFormat</h2>

            
            <p class="p">An enumeration of type string that defines the report format. Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e2748">Enumeration Value</th>

                            <th class="featureTableHeader  " id="d572643e2751">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e2748" data-title="Enumeration Value"><span class="keyword parmname">Matrix</span></td>

                            <td class="entry" headers="d572643e2751" data-title="Description">Summarizes data in a grid. Use to compare related totals.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2748" data-title="Enumeration Value"><span class="keyword parmname">Summary</span></td>

                            <td class="entry" headers="d572643e2751" data-title="Description">Lists, sorts, and subtotals data.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2748" data-title="Enumeration Value"><span class="keyword parmname">Tabular</span></td>

                            <td class="entry" headers="d572643e2751" data-title="Description">Lists data with no sorting or subtotals.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2748" data-title="Enumeration Value"><span class="keyword parmname">Joined</span></td>

                            <td class="entry" headers="d572643e2751" data-title="Description">Joins data from different report types storing each
                                report’s data in its own block.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportFormattingRule">
<a name="ReportFormattingRule" data-id=""><!-- --></a><h2 class="helpHead2">ReportFormattingRule</h2>

            
            <p class="p">Defines conditional highlighting for report summary data. You can specify up to 5
                formatting rules per report.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e2824">Field</th>

                            <th class="featureTableHeader  " id="d572643e2827">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e2830">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e2824" data-title="Field"><span class="keyword parmname">aggregate</span></td>

                            <td class="entry" headers="d572643e2827" data-title="Field Type">
<a class="xref" href="#ReportFormattingSummaryType">ReportFormattingSummaryType</a>
                                (enumeration of type string)</td>

                            <td class="entry" headers="d572643e2830" data-title="Description">Defines how the field specified in <samp class="codeph nolang">columnName</samp> is summarized. For example, <samp class="codeph nolang">Sum</samp>.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2824" data-title="Field"><span class="keyword parmname">columnName</span></td>

                            <td class="entry" headers="d572643e2827" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e2830" data-title="Description">Required. Specifies the field whose value ranges are represented
                                by colors.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2824" data-title="Field"><span class="keyword parmname">values</span></td>

                            <td class="entry" headers="d572643e2827" data-title="Field Type">
<a class="xref" href="#ReportFormattingRuleValue">ReportFormattingRuleValue</a>
                                (enumeration of type string)</td>

                            <td class="entry" headers="d572643e2830" data-title="Description">Required. Specifies the background colors and associated ranges
                                for formatted data values.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportFormattingSummaryType">
<a name="ReportFormattingSummaryType" data-id=""><!-- --></a><h2 class="helpHead2">ReportFormattingSummaryType</h2>

            
            <p class="p">An enumeration of type string that defines how report fields are summarized. Valid
                values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e2912">Enumeration Value</th>

                            <th class="featureTableHeader  " id="d572643e2915">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e2912" data-title="Enumeration Value"><span class="keyword parmname">Sum</span></td>

                            <td class="entry" headers="d572643e2915" data-title="Description">Total</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2912" data-title="Enumeration Value"><span class="keyword parmname">Average</span></td>

                            <td class="entry" headers="d572643e2915" data-title="Description">Average</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2912" data-title="Enumeration Value"><span class="keyword parmname">Maximum</span></td>

                            <td class="entry" headers="d572643e2915" data-title="Description">Largest value</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2912" data-title="Enumeration Value"><span class="keyword parmname">Minimum</span></td>

                            <td class="entry" headers="d572643e2915" data-title="Description">Smallest value</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2912" data-title="Enumeration Value"><span class="keyword parmname">Unique</span></td>

                            <td class="entry" headers="d572643e2915" data-title="Description">Unique values</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportFormattingRuleValue">
<a name="ReportFormattingRuleValue" data-id=""><!-- --></a><h2 class="helpHead2">ReportFormattingRuleValue</h2>

            
            <p class="p">Specifies the background colors and associated ranges for formatted data values. You
                can specify up to 3 background colors and 0 to 3 range upper bounds. Valid
                values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e2998">Field</th>

                            <th class="featureTableHeader  " id="d572643e3001">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e3004">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e2998" data-title="Field"><span class="keyword parmname">backgroundColor</span></td>

                            <td class="entry" headers="d572643e3001" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3004" data-title="Description">(Required) Specifies a highlighting color for the field in
                                    <samp class="codeph nolang">columnName</samp>. Must be a valid
                                hex color string such as #54C254. At least one color is required.
                                You can optionally specify a different color for up to 3 ranges as
                                determined by <samp class="codeph nolang">rangeUpperBound</samp>.
                                If you don’t specify a color for a particular range, the background
                                is transparent.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e2998" data-title="Field"><span class="keyword parmname">rangeUpperBound</span></td>

                            <td class="entry" headers="d572643e3001" data-title="Field Type">double</td>

                            <td class="entry" headers="d572643e3004" data-title="Description">Delineates a range to which a background color applies. If you
                                don’t specify an upper bound for a particular range, the bound is
                                assumed to be plus infinity. The following example sets the
                                background color for the Sales column to #B50E03 for aggregate sales
                                less than or equal to 100, sets no background for sales from 100 to
                                1000, and sets the background color to #006714 for sales greater
                                than 1000. <div class="codeSection xml" lwc:dom="manual"><dx-code-block></dx-code-block></div>
</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportParam">
<a name="ReportParam" data-id=""><!-- --></a><h2 class="helpHead2">ReportParam</h2>

            
            <p class="p">ReportParam represents settings specific to a report type, especially options that
                let you filter a report to certain useful subsets.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e3071">Field</th>

                            <th class="featureTableHeader  " id="d572643e3074">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e3077">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e3071" data-title="Field"><span class="keyword parmname">name</span></td>

                            <td class="entry" headers="d572643e3074" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3077" data-title="Description">Required. Specifies a specific <span class="keyword parmname">reportType</span>
                                setting.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3071" data-title="Field"><span class="keyword parmname">value</span></td>

                            <td class="entry" headers="d572643e3074" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3077" data-title="Description">Required. The setting value.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportAggregateDatatype">
<a name="ReportAggregateDatatype" data-id=""><!-- --></a><h2 class="helpHead2">ReportAggregateDatatype</h2>

            
            <p class="p">An enumeration of type string that specifies the data type for formatting and display
                of custom summary formula results. Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e3135">Enumeration Value</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e3135" data-title="Enumeration Value"><span class="keyword parmname">currency</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3135" data-title="Enumeration Value"><span class="keyword parmname">number</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3135" data-title="Enumeration Value"><span class="keyword parmname">percent</span></td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportChart">
<a name="ReportChart" data-id=""><!-- --></a><h2 class="helpHead2">ReportChart</h2>

            
            <p class="p">ReportChart represents charts on summary, matrix, and joined reports.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e3190">Field</th>

                            <th class="featureTableHeader  " id="d572643e3193">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e3196">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="ph" id="backgroundColor1"><a name="backgroundColor1" data-id=""><!-- --></a><span class="keyword parmname">backgroundColor1</span></span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">Specifies the beginning color (in HTML format) for a gradient
                                color background.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="ph" id="backgroundColor2"><a name="backgroundColor2" data-id=""><!-- --></a><span class="keyword parmname">backgroundColor2</span></span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">Specifies the end color (in HTML format) for a gradient color
                                background.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">backgroundFadeDir</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">ChartBackgroundDirection (enumeration of type string)</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">Specifies the direction for a gradient color background. Use with
                                    <span class="keyword parmname">backgroundColor1</span> to specify the beginning
                                color and <span class="keyword parmname">backgroundColor2</span> to specify the end
                                color for the gradient design. Use white for both if you do not want
                                a background design. Valid values:<ul class="ul bulletList">
                                    <li class="li"><samp class="codeph nolang">Diagonal</samp></li>

                                    <li class="li"><samp class="codeph nolang">LeftToRight</samp></li>

                                    <li class="li"><samp class="codeph nolang">TopToBottom</samp></li>

                                </ul>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname"><span class="ph" id="ChartSummaries"><a name="ChartSummaries" data-id=""><!-- --></a>chartSummaries</span></span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">
<a class="xref" href="#ChartSummary">ChartSummary</a>[]</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">
<span class="ph" id="ChartSummariesDesc"><a name="ChartSummariesDesc" data-id=""><!-- --></a>Specifies the summaries you want to
                                    use for the chart.</span> Invalid summaries are ignored without
                                notification. If there are no valid summaries, RowCount is used by
                                default for the axis value. This field is available in API version
                                17.0 and later.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname"><span class="ph" id="chartType"><a name="chartType" data-id=""><!-- --></a>chartType</span></span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">
<a class="xref" href="#ChartType">ChartType</a> (enumeration of type
                                string)</td>

                            <td class="entry" headers="d572643e3196" data-title="Description"><span class="ph" id="chartTypeDescription"><a name="chartTypeDescription" data-id=""><!-- --></a>Required. Specifies the chart type.
                                    Available chart types depend on the <span class="keyword parmname">report
                                        type</span>.</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname" id="EnableHoverLabels"><a name="EnableHoverLabels" data-id=""><!-- --></a>enableHoverLabels</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">
<span class="ph" id="EnableHoverDesc"><a name="EnableHoverDesc" data-id=""><!-- --></a>Specifies whether to display values,
                                    labels, and percentages when hovering over charts. Hover details
                                    depend on chart type. Percentages apply to pie, donut, and
                                    funnel charts only.</span> This field is available in API version
                                17.0 and later.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname"><span class="ph" id="ExpandOthers"><a name="ExpandOthers" data-id=""><!-- --></a>expandOthers</span></span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">
<span class="ph" id="ExpandOthersDesc"><a name="ExpandOthersDesc" data-id=""><!-- --></a>Specifies whether to combine all groups
                                    less than or equal to 3% of the total into a single 'Others'
                                    wedge or segment. This only applies to pie, donut, and funnel
                                    charts. Set to <samp class="codeph java">true</samp> to show
                                    all values individually on the chart; set to <samp class="codeph java">false</samp> to combine small groups
                                    into 'Others.'</span> This field is available in API version 17.0
                                and later.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname" id="GroupingColumn"><a name="GroupingColumn" data-id=""><!-- --></a>groupingColumn</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3196" data-title="Description"><span class="ph" id="GroupingColumnDesc"><a name="GroupingColumnDesc" data-id=""><!-- --></a>Specifies the field by which to group
                                    data. This data is displayed on the X-axis for vertical column
                                    charts and on the Y-axis for horizontal bar charts.</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">legendPosition</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">ChartLegendPosition (enumeration of type string)</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">Required.<div class="p">The location of the legend with respect to the chart.
                                    The valid values are:<ul class="ul bulletList">
                                        <li class="li"><samp class="codeph nolang">Bottom</samp></li>

                                        <li class="li"><samp class="codeph nolang">OnChart</samp></li>

                                        <li class="li"><samp class="codeph nolang">Right</samp></li>

                                    </ul>
</div>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">location</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">
<a class="xref" href="#ChartPosition">ChartPosition</a> (enumeration of type
                                string)</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">Required. Specifies whether the chart is displayed at the top or
                                bottom of the report.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">secondaryGroupingColumn</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">For grouped chart types: Specifies the field by which to group
                                the data.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">showAxisLabels</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">For bar and line charts: Specifies whether the chart displays
                                names for each axis.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname"><span class="ph" id="showPercentage"><a name="showPercentage" data-id=""><!-- --></a>showPercentage</span></span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e3196" data-title="Description"><span class="ph" id="showPercentageDescription"><a name="showPercentageDescription" data-id=""><!-- --></a>Indicates if percentages are
                                    displayed for wedges and segments of pie, donut, and funnel
                                    charts, as well as for gauges (<samp class="codeph java">true</samp>), or not (<samp class="codeph java">false</samp>).</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname"><span class="ph" id="showTotal"><a name="showTotal" data-id=""><!-- --></a>showTotal</span></span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e3196" data-title="Description"><span class="ph" id="showTotalDescription"><a name="showTotalDescription" data-id=""><!-- --></a>Indicates if the total is displayed
                                    for donut charts and gauges (<samp class="codeph java">true</samp>), or not (<samp class="codeph java">false</samp>).</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname"><span class="ph" id="showValues"><a name="showValues" data-id=""><!-- --></a>showValues</span></span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">boolean</td>

                            <td class="entry" headers="d572643e3196" data-title="Description"><span class="ph" id="showValueDescription"><a name="showValueDescription" data-id=""><!-- --></a>Indicates if the values of
                                    individual records or groups are displayed for charts (<samp class="codeph java">true</samp>), or not (<samp class="codeph java">false</samp>).</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">size</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">
<a class="xref" href="#ChartSize">ReportChartSize</a> (enumeration of type
                                string)</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">Required. Specifies the chart size.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname" id="SummaryAggregate"><a name="SummaryAggregate" data-id=""><!-- --></a>summaryAggregate</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">
<a class="xref" href="#ReportSummaryType">ReportSummaryType</a> (enumeration of type string)</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">Defines how to summarize the chart data. For example, <samp class="codeph soql">Sum</samp>. <span class="ph" id="SeeChartSummaries"><a name="SeeChartSummaries" data-id=""><!-- --></a>No
                                    longer supported in version API 17.0 and later. See
                                        <span class="keyword parmname">chartSummaries</span>.</span>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">summaryAxisManualRangeEnd</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">double</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">When specifying the axis range manually: Defines the ending
                                value.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">summaryAxisManualRangeStart</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">double</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">When specifying the axis range manually: Defines the starting
                                value.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">summaryAxisRange</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">
<a class="xref" href="#ChartAxisRangeOptions">ChartRangeType</a> (enumeration of type
                                string)</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">Required. For bar, line, and column charts: Defines whether to
                                specify the axis range manually or automatically.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname" id="SummaryColumn"><a name="SummaryColumn" data-id=""><!-- --></a>summaryColumn</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">Required. Specifies the field by which to summarize the chart
                                data. Typically this field is displayed on the Y-axis. No longer
                                supported in version API 17.0 and later. See
                                    <span class="keyword parmname">chartSummaries</span>.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">textColor</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">The color (in HTML format) of the chart text and labels.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">textSize</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">int</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">The size of the chart text and labels. Valid values:<a name="text_size" data-id=""><!-- --></a><ul class="ul bulletList" id="text_size">
                                    <li class="li"><samp class="codeph nolang">8</samp></li>

                                    <li class="li"><samp class="codeph nolang">9</samp></li>

                                    <li class="li"><samp class="codeph nolang">10</samp></li>

                                    <li class="li"><samp class="codeph nolang">12</samp></li>

                                    <li class="li"><samp class="codeph nolang">14</samp></li>

                                    <li class="li"><samp class="codeph nolang">18</samp></li>

                                    <li class="li"><samp class="codeph nolang">24</samp></li>

                                    <li class="li"><samp class="codeph nolang">36</samp></li>

                                </ul>
<p class="p">The maximum size is 18. Larger values are shown at 18
                                    points.</p>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">title</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">The chart title. Max 255 characters.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">titleColor</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">The color (in HTML format) of the title text.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3190" data-title="Field"><span class="keyword parmname">titleSize</span></td>

                            <td class="entry" headers="d572643e3193" data-title="Field Type">int</td>

                            <td class="entry" headers="d572643e3196" data-title="Description">The size of the title text. Valid values:<ul class="ul bulletList">
                                    <li class="li"><samp class="codeph nolang">8</samp></li>

                                    <li class="li"><samp class="codeph nolang">9</samp></li>

                                    <li class="li"><samp class="codeph nolang">10</samp></li>

                                    <li class="li"><samp class="codeph nolang">12</samp></li>

                                    <li class="li"><samp class="codeph nolang">14</samp></li>

                                    <li class="li"><samp class="codeph nolang">18</samp></li>

                                    <li class="li"><samp class="codeph nolang">24</samp></li>

                                    <li class="li"><samp class="codeph nolang">36</samp></li>

                                </ul>
<p class="p">The maximum size is 18. Larger values are shown at 18
                                    points.</p>
</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ChartType">
<a name="ChartType" data-id=""><!-- --></a><h2 class="helpHead2">ChartType</h2>

            
            <p class="p">An enumeration of type string that defines the chart type. For information on each of
                these chart types, see “Chart Types” in the Salesforce online help.
                Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e3752">Enumeration Value</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">None</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">HorizontalBar</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">HorizontalBarGrouped</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">HorizontalBarStacked</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">HorizontalBarStackedTo100</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">VerticalColumn</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">VerticalColumnGrouped</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">VerticalColumnStacked</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">VerticalColumnStackedTo100</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">Line</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">LineGrouped</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">LineCumulative</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">LineCumulativeGrouped</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">Pie</span></td>

                        </tr>

                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">Donut</span></td>

                        </tr>

                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">Funnel</span></td>

                        </tr>

                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">Scatter</span></td>

                        </tr>

                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname">ScatterGrouped</span></td>

                        </tr>

                        
                        
                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname" id="ChartTypeVCL"><a name="ChartTypeVCL" data-id=""><!-- --></a>VerticalColumnLine</span></td>

                        </tr>

                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname" id="ChartTypeVCGL"><a name="ChartTypeVCGL" data-id=""><!-- --></a>VerticalColumnGroupedLine</span></td>

                        </tr>

                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e3752" data-title="Enumeration Value"><span class="keyword parmname" id="ChartTypeVCSL"><a name="ChartTypeVCSL" data-id=""><!-- --></a>VerticalColumnStackedLine</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3752" data-title="Enumeration Value">
<span class="keyword parmname" id="ChartTypePlugin"><a name="ChartTypePlugin" data-id=""><!-- --></a>Plugin</span><p class="p">Reserved for
                                    future use. This value is available in API version 31.0 and
                                    later.</p>
</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ChartPosition">
<a name="ChartPosition" data-id=""><!-- --></a><h2 class="helpHead2">ChartPosition</h2>

            
            <p class="p">An enumeration of type string that specifies the position of the chart in the report.
                Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e3940">Enumeration Value</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e3940" data-title="Enumeration Value"><span class="keyword parmname">CHART_TOP</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3940" data-title="Enumeration Value"><span class="keyword parmname">CHART_BOTTOM</span></td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ChartSummary">
<a name="ChartSummary" data-id=""><!-- --></a><h2 class="helpHead2">ChartSummary</h2>

            
            <p class="p"><span class="ph" id="ChartSummaryDef"><a name="ChartSummaryDef" data-id=""><!-- --></a>ChartSummary defines how data in the chart is
                    summarized.</span> Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e3989">Field</th>

                            <th class="featureTableHeader  " id="d572643e3992">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e3995">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e3989" data-title="Field"><span class="keyword parmname" id="ChartSummaryAggregate"><a name="ChartSummaryAggregate" data-id=""><!-- --></a>aggregate</span></td>

                            <td class="entry" headers="d572643e3992" data-title="Field Type">
<a class="xref" href="#ReportSummaryType">ReportSummaryType</a>
                            </td>

                            <td class="entry" headers="d572643e3995" data-title="Description"><span class="ph" id="ChartSummaryAggregateDesc"><a name="ChartSummaryAggregateDesc" data-id=""><!-- --></a>Specifies the aggregation
                                    method—such as <samp class="codeph soql">Sum</samp>,
                                        <samp class="codeph soql">Average</samp>, <samp class="codeph soql">Min</samp>, and <samp class="codeph soql">Max</samp>—for the summary value.
                                    Use the <span class="keyword parmname">column</span> field to specify the summary
                                    value to use for the aggregation. You don't need to specify this
                                    field for RowCount or custom summary formulas.</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3989" data-title="Field"><span class="keyword parmname" id="ChartSummaryAxisBinding"><a name="ChartSummaryAxisBinding" data-id=""><!-- --></a>axisBinding</span></td>

                            <td class="entry" headers="d572643e3992" data-title="Field Type">
<a class="xref" href="#ChartAxis">ChartAxis</a>
                            </td>

                            <td class="entry" headers="d572643e3995" data-title="Description"><span class="ph" id="ChartSummaryAxisBindingDesc"><a name="ChartSummaryAxisBindingDesc" data-id=""><!-- --></a>Specifies the axis or axes
                                    to use on the chart. Use the <span class="keyword parmname">column</span> field
                                    to specify the summary value to use for the axis.</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e3989" data-title="Field"><span class="keyword parmname"><span class="ph" id="ChartSummaryColumn"><a name="ChartSummaryColumn" data-id=""><!-- --></a>column</span></span></td>

                            <td class="entry" headers="d572643e3992" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e3995" data-title="Description"><span class="ph" id="ChartSummaryColumnDesc"><a name="ChartSummaryColumnDesc" data-id=""><!-- --></a>Required. Specifies the summary
                                    field for the chart data. If all columns are invalid, RowCount
                                    is used by default for the axis value. For vertical column and
                                    horizontal bar combination charts, you can specify up to four
                                    values.</span></td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ChartAxis">
<a name="ChartAxis" data-id=""><!-- --></a><h2 class="helpHead2">ChartAxis</h2>

            
            <p class="p">An enumeration of type string that specifies the axis or axes to be used in charts.
                Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e4093">Enumeration Value</th>

                            <th class="featureTableHeader  " id="d572643e4096">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        
                        <tr>
                            <td class="entry" headers="d572643e4093" data-title="Enumeration Value"><span class="keyword parmname" id="ChartAxisX"><a name="ChartAxisX" data-id=""><!-- --></a>x</span></td>

                            <td class="entry" headers="d572643e4096" data-title="Description"><span class="ph" id="ChartAxisXDesc"><a name="ChartAxisXDesc" data-id=""><!-- --></a>The summary value to use for the X-axis
                                    of a scatter chart.</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4093" data-title="Enumeration Value"><span class="keyword parmname" id="ChartAxisY"><a name="ChartAxisY" data-id=""><!-- --></a>y</span></td>

                            <td class="entry" headers="d572643e4096" data-title="Description"><span class="ph" id="ChartAxisYDesc"><a name="ChartAxisYDesc" data-id=""><!-- --></a>The Y-axis for the chart.</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4093" data-title="Enumeration Value"><span class="keyword parmname" id="ChartAxisY2"><a name="ChartAxisY2" data-id=""><!-- --></a>y2</span></td>

                            <td class="entry" headers="d572643e4096" data-title="Description"><span class="ph" id="ChartAxisY2Desc"><a name="ChartAxisY2Desc" data-id=""><!-- --></a>The secondary Y-axis for vertical column
                                    combination charts with a line added.</span></td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ChartSize">
<a name="ChartSize" data-id=""><!-- --></a><h2 class="helpHead2">ReportChartSize</h2>

            
            <p class="p">An enumeration of type string that specifies the chart size. Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e4158">Enumeration Value</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e4158" data-title="Enumeration Value"><span class="keyword parmname">Tiny</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4158" data-title="Enumeration Value"><span class="keyword parmname">Small</span></td>

                        </tr>

                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e4158" data-title="Enumeration Value"><span class="keyword parmname">Medium</span></td>

                        </tr>

                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e4158" data-title="Enumeration Value"><span class="keyword parmname">Large</span></td>

                        </tr>

                        <tr valign="top">
                            <td class="vertical-align-top " headers="d572643e4158" data-title="Enumeration Value"><span class="keyword parmname">Huge</span></td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ChartAxisRangeOptions">
<a name="ChartAxisRangeOptions" data-id=""><!-- --></a><h2 class="helpHead2">ChartRangeType</h2>

            
            <p class="p">An enumeration of type string that defines the report format. Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e4223">Enumeration Value</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e4223" data-title="Enumeration Value"><span class="keyword parmname">Auto</span></td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4223" data-title="Enumeration Value"><span class="keyword parmname">Manual</span></td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportTimeFrameFilter">
<a name="ReportTimeFrameFilter" data-id=""><!-- --></a><h2 class="helpHead2">ReportTimeFrameFilter</h2>

            
            <p class="p">ReportTimeFrameFilter represents the report time period.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e4270">Field</th>

                            <th class="featureTableHeader  " id="d572643e4273">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e4276">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e4270" data-title="Field"><span class="keyword parmname">dateColumn</span></td>

                            <td class="entry" headers="d572643e4273" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e4276" data-title="Description">Required. The date field on which to filter data. For example,
                                    <samp class="codeph nolang">CLOSE_DATE</samp>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4270" data-title="Field"><span class="ph" id="endDate_field"><a name="endDate_field" data-id=""><!-- --></a><span class="keyword parmname">endDate</span></span></td>

                            <td class="entry" headers="d572643e4273" data-title="Field Type">date</td>

                            <td class="entry" headers="d572643e4276" data-title="Description">When <span class="keyword parmname">interval</span> is
                                    <span class="keyword parmname">INTERVAL_CUSTOM</span>, specifies the end of the
                                custom time period.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4270" data-title="Field"><span class="ph" id="interval_field"><a name="interval_field" data-id=""><!-- --></a><span class="keyword parmname">interval</span></span></td>

                            <td class="entry" headers="d572643e4273" data-title="Field Type">
<a class="xref" href="#UserDateInterval">UserDateInterval</a> (enumeration of type
                                string)</td>

                            <td class="entry" headers="d572643e4276" data-title="Description">Required. Specifies the period of time.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4270" data-title="Field"><span class="ph" id="startDate_field"><a name="startDate_field" data-id=""><!-- --></a><span class="keyword parmname">startDate</span></span></td>

                            <td class="entry" headers="d572643e4273" data-title="Field Type">date</td>

                            <td class="entry" headers="d572643e4276" data-title="Description">When <span class="keyword parmname">interval</span> is
                                    <span class="keyword parmname">INTERVAL_CUSTOM</span>, specifies the start of the
                                custom time period.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="ReportCrossFilter">
<a name="ReportCrossFilter" data-id=""><!-- --></a><h2 class="helpHead2">ReportCrossFilter</h2>

            
            <p class="p">ReportCrossFilter represents the cross filter functionality in reports.</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e4381">Field</th>

                            <th class="featureTableHeader  " id="d572643e4384">Field Type</th>

                            <th class="featureTableHeader  " id="d572643e4387">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e4381" data-title="Field"><span class="keyword parmname">criteriaItems</span></td>

                            <td class="entry" headers="d572643e4384" data-title="Field Type"><a class="xref" href="#ReportFilterItem">ReportFilterItem</a></td>

                            <td class="entry" headers="d572643e4387" data-title="Description">Represents the subfilters of a cross filter. There can be up to
                                five subfilters. This field requires the following attributes.<ul class="ul bulletList">
                                    <li class="li"><samp class="codeph nolang">Column</samp></li>

                                    <li class="li"><samp class="codeph nolang">Operator</samp></li>

                                    <li class="li"><samp class="codeph nolang">Value</samp></li>

                                </ul>
</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4381" data-title="Field"><span class="keyword parmname">operation</span></td>

                            <td class="entry" headers="d572643e4384" data-title="Field Type">ObjectFilterOperator ( Enumeration of type string)</td>

                            <td class="entry" headers="d572643e4387" data-title="Description">The action indicating whether to include or exclude an object.
                                Valid values: <samp class="codeph nolang">with</samp> and <samp class="codeph nolang">without</samp>.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4381" data-title="Field"><span class="keyword parmname">primaryTableColumn</span></td>

                            <td class="entry" headers="d572643e4384" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e4387" data-title="Description">The parent object used for the cross filter.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4381" data-title="Field"><span class="keyword parmname">relatedTable</span></td>

                            <td class="entry" headers="d572643e4384" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e4387" data-title="Description">The child object used for the cross filter.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4381" data-title="Field"><span class="keyword parmname">relatedTableJoinColumn</span></td>

                            <td class="entry" headers="d572643e4384" data-title="Field Type">string</td>

                            <td class="entry" headers="d572643e4387" data-title="Description">The field from the child object that is used to join the
                                parent.</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section">
<h2 class="helpHead2">Declarative Metadata Sample Definition</h2>

            
            <p class="p">A sample XML snippet using cross filters to build an Accounts report for cases where
                case status is not closed:</p>

            <div class="codeSection xml" lwc:dom="manual"><dx-code-block></dx-code-block></div>

            <div class="box message info"><doc-content-callout><p>This sample was generated using the API version 23.0.</p></doc-content-callout></div>

        </div>

        <div class="section" id="UserDateInterval">
<a name="UserDateInterval" data-id=""><!-- --></a><h2 class="helpHead2">UserDateInterval</h2>

            
            <p class="p">An enumeration of type string that defines the period of time. Valid values:</p>

            
<div class="data colSort"><table class="featureTable sort_table" summary="">
                    
                    
                    <thead class="thead sorted" align="left">
                        <tr>
                            <th class="featureTableHeader  " id="d572643e4520">Enumeration Value</th>

                            <th class="featureTableHeader  " id="d572643e4523">Description</th>

                        </tr>

                    </thead>

                    <tbody class="tbody">
                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURRENT</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current fiscal quarter</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURNEXT1</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and next fiscal quarters</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURPREV1</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and previous fiscal quarters</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXT1</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next fiscal quarter</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREV1</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Previous fiscal quarter</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURNEXT3</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and next three fiscal quarters</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURFY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current fiscal year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREVFY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Previous fiscal year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREV2FY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Previous two fiscal years</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_AGO2FY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Two fiscal years ago</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXTFY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next fiscal year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREVCURFY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and previous fiscal years</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREVCUR2FY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and previous two fiscal years</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURNEXTFY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and next fiscal year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="ph" id="interval_custom_field"><a name="interval_custom_field" data-id=""><!-- --></a><span class="keyword parmname">INTERVAL_CUSTOM</span></span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">A custom time period. Use <span class="keyword parmname">startDate</span> and
                                    <span class="keyword parmname">endDate</span> fields to specify the time period's
                                start date and end date.</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_YESTERDAY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Yesterday</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_TODAY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Today</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_TOMORROW</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Tomorrow</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_LASTWEEK</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Last calendar week</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_THISWEEK</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">This calendar week</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXTWEEK</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next calendar week</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_LASTMONTH</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Last calendar month</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_THISMONTH</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">This calendar month</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXTMONTH</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next calendar month</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_LASTTHISMONTH</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and previous calendar months</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_THISNEXTMONTH</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and next calendar months</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURRENTQ</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current calendar quarter</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURNEXTQ</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and next calendar quarters</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURPREVQ</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and previous calendar quarters</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXTQ</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next calendar quarter</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREVQ</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Previous calendar quarter</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURNEXT3Q</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and next three calendar quarters</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current calendar year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREVY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Previous calendar year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREV2Y</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Previous two calendar years</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_AGO2Y</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Two calendar years ago</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXTY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next calendar year</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREVCURY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and previous calendar years</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_PREVCUR2Y</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and previous two calendar years</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_CURNEXTY</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and next calendar years</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_LAST7</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Last 7 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_LAST30</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Last 30 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_LAST60</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Last 60 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_LAST90</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Last 90 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_LAST120</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Last 120 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXT7</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next 7 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXT30</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next 30 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXT60</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next 60 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXT90</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next 90 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">INTERVAL_NEXT120</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Next 120 days</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">LAST_FISCALWEEK</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">When custom fiscal years are enabled: Last fiscal week</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">THIS_FISCALWEEK</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">When custom fiscal years are enabled: This fiscal week</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">NEXT_FISCALWEEK</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">When custom fiscal years are enabled: Next fiscal week</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">LAST_FISCALPERIOD</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">When custom fiscal years are enabled: Last fiscal period</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">THIS_FISCALPERIOD</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">When custom fiscal years are enabled: This fiscal period</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">NEXT_FISCALPERIOD</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">When custom fiscal years are enabled: Next fiscal period</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">LASTTHIS_FISCALPERIOD</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">When custom fiscal years are enabled: This fiscal period and last
                                fiscal period</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">THISNEXT_FISCALPERIOD</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">When custom fiscal years are enabled: This fiscal period and next
                                fiscal period</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">CURRENT_ENTITLEMENT_PERIOD</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current entitlement period</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">PREVIOUS_ENTITLEMENT_PERIOD</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Previous entitlement period</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">PREVIOUS_TWO_ENTITLEMENT_PERIODS</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Previous two entitlement periods</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">TWO_ENTITLEMENT_PERIODS_AGO</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Two entitlement periods ago</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">CURRENT_AND_PREVIOUS_ENTITLEMENT_PERIOD</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and previous entitlement period</td>

                        </tr>

                        <tr>
                            <td class="entry" headers="d572643e4520" data-title="Enumeration Value"><span class="keyword parmname">CURRENT_AND_PREVIOUS_TWO_ENTITLEMENT_PERIODS</span></td>

                            <td class="entry" headers="d572643e4523" data-title="Description">Current and previous two entitlement periods</td>

                        </tr>

                    </tbody>

                </table></div>

        </div>

        <div class="section" id="twb_sample">
<a name="twb_sample" data-id=""><!-- --></a><h2 class="helpHead2">Declarative Metadata Sample Definition</h2>

            
            
            <p class="p">A sample XML report definition:</p>

            
            <div class="codeSection xml" lwc:dom="manual"><dx-code-block></dx-code-block></div>

        </div>

        <div class="section" id="twb_joined_sample">
<a name="twb_joined_sample" data-id=""><!-- --></a><h2 class="helpHead2">Declarative Metadata Sample Definition for a Joined Report</h2>

            
            
            <p class="p">A sample XML report definition:</p>

            <div class="codeSection xml" lwc:dom="manual"><dx-code-block></dx-code-block></div>

        </div>

        <div class="section">
<h2 class="helpHead2">Wildcard Support in the Manifest File</h2>

            
            <p class="p">This metadata type doesn’t support the wildcard character <samp class="codeph nolang">*</samp> (asterisk) in the <span class="ph filepath">package.xml</span> manifest file.
                For information about using the manifest file, see <a class="xref" href="/docs/atlas.en-us.api_meta.meta/api_meta/file_based_zip_file.htm" title="The deploy() and retrieve() calls are used to deploy and retrieve a .zip file. Within the .zip file is a project manifest (package.xml) that lists what to retrieve or deploy, and one or more XML components that are organized into folders." data-id="docs/atlas.en-us.api_meta.meta/api_meta/file_based_zip_file.htm">Deploying and Retrieving Metadata with the Zip
                    File</a>.</p>

        </div>

    </div><div id="sfdc:seealso" class="related-links">
<div class="relinfo">
<h4>See Also</h4>
<ul class="unstyled"><li><div><a class="link" href="/docs/atlas.en-us.api_meta.meta/api_meta/meta_dashboard.htm" title="Represents a dashboard. Dashboards are visual representations of data that allow you to see key metrics and performance at a glance." data-id="docs/atlas.en-us.api_meta.meta/api_meta/meta_dashboard.htm">Dashboard</a></div></li></ul>
</div>
</div></div>
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