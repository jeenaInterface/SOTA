Feature: Labor Order Difference Report
    As a user
    I want to generate the Labor Order Difference Report
    So that I can view labor order differences for a selected date and shift

    @labororderReceiverLOG @ui
    Scenario: VERIFY Labor Order Receiver Report
        Given TR user logged into the application
        Then I am on the Labor Order Receiver Report page
        Then Select One Jan 1 from the from date field
        And Select current date from the to date field
        And I click on the Search button
        Then Verify the ignore Functionalities
        Then Verify the add remarks Functionalities
