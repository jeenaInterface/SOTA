Feature: Steady tracking sheet Functionalities
    As a user of the system
    I want to manage steady tracking sheets
    So that I can maintain and track steady assignments



    @steadyTrackingSheet @sanity
    Scenario: Update steady tracking sheet
        Given TR user logged into the application
        And User navigates to the steady tracking sheet page
        And Select Job code for some steadies under Ops - Clerk tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Verify total value
        And Select Job code for some steadies under vessel - clerk tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Verify total value
        And Select Job code for some steadies under Vessel - forman tab
        Then  Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under vessel - crane operator tab
        Then  Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under yard - clerk tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under yard - forman tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under yard - crane operator tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under yard - longshore tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under rail - clerk tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under rail - forman tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under rail - crane operator tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under rail - longshore tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet
        And Select Job code for some steadies under TSRV - longshore tab
        Then Enter remarks for first row in the steady tracking sheet
        And User clicks on Save button in the steady tracking sheet
        Then User should see success message for steady tracking sheet



   @sanity 
  Scenario: LR managment user - View functionality
  Given LR managment user logged into the application
  And User navigates to the steady tracking sheet page
  Then Verify update steady tracking functionalities not available for LR managment user


