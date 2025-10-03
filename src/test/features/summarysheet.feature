Feature: Verify summary sheet functionaities

    @sanity @summarySheet
    Scenario:Verify summary sheet update functionalities
        Given TR user logged into the application
        Then the user creates a new vessel order
        Then the user push the labor order to the summary sheet
        Then TR user verifies that the vessel labor order is pushed to the summary sheet and verifies the details
        Then update manning details, calo status and NF and Cut time in summary sheet and verify the details
        Then Verify download summary sheet report
        Then Verify download labor order difference report
        Then Verify steady dispatch report
        Then Verify hall labor report
        Then Verify download duplicate report
        Then Verify transfer to tracking sheet
        Then Verify place new orders button is redirecting to new order form


    @sanity @dispatchUpdateTab
    Scenario:Verify dispatch update tab in summary sheet
        Given TR user logged into the application
        Then the user creates a new vessel order
        Then the user push the labor order to the summary sheet
        Then TR user verifies that the vessel labor order is pushed to the summary sheet and verifies the details
        Then Cliclk on dispatch update tab 
        Then Add steady and hall details under replacement section and click on save button
        # Then Add steady and hall details under Add section and click on save button
        # Then Add steady and hall details under remove section and click on save button
        # Then Add steady and hall details under shift section and click on save button

