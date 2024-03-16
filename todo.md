- [x] logout controller
- [x] logout frontend
- [x] add initial deposit frontend
- [x] add monthly recurring income
- [x] add hasSetIncome in user.model
- [x] add hasSetExpenses in user.model
- [x] add monthlyIncome in user.model
- [x] add monthlyExpenses in user.model
- [x] get Transactions controller + route
- [x] create Transaction controller + route
- [x] Merge income and expenses in a single route w/ controller as you can't have expense more than income
<!-- - [ ] Add attachment feature in sidebar -->
- [ ] filter Transactions feature
- [x] Demo user in register/login
- [ ] Pro version of the thing with stripe integration
<!-- - [ ] Oauth? -->
- [x] DashBoard

  - [x] SideBar
    - [x] Logout at the bottom of the sidebar
  - [x] Overview
  - [x] Transactions
  - [x] Settings / Account

- [x] Goals

  - [x] Goals not found frontend
  - [x] Goals model, finalAmount, currentAmount, title, desc
  - [x] Each goal seperate page
  <!-- - [ ] markdown mode in goal desc -->
  - [x] when do you wan't this goal to finish? shadcn datetime in the frontend
  <!-- - [ ] shadcn command box on frontend -->
  - [ ] paginate goals display
  - [x] GoalsDisplay doesn't immideatly refresh to add the new goal after creating a new goal

- [x] update goal controller w/ endpoint
- [x] show successfull toast messages whenever a req user makes is 200ok, for AddMoneyToGoal
- [x] user avatar
- [ ] Setings page: theme switch

- [x] change password
- [x] add date of birth
- [x] update income and expense
- [ ] export all transaction data as a csv
- [ ] export all transaction data as a csv
- [ ] in overview add option to control + k andd add "Tip: try ctrl + k"
- [x] update account balance
- [x] overview: you can update this in /account ; incomeAndExpense / accountBalance
- [x] give feedback controller
- [x] update date-of-birth controller
- [x] delete goal option w/ alert dialog shadcn
- [x] delete goal controller
- [x] register component immideatly logges user in
- [ ] stripe integration w/ upgrade to pro
  <!-- - [ ] max 5 goals for free user, unlimited goals for paid user -->
  <!-- - [ ] add more categories for goals, user model: categories-default [1, 2, 3, 4, 5 ] -->
- [x] submit feedback button will open a shadcn drawer
- [ ] created-date in each goalDisplay + singularGoalView
- [x] deleting a goal add money back to the user's balance
- [ ] danger zone in settings made with shadcn accordian:

  - [ ] delete all goals; this doesn't work for demo account
  - [ ] delete all transactions; this doesn't work for demo account
  - [ ] delete account permanantly; this doesn't work for demo account

- [x] add react-hot-toast
- [x] remove password from all findByIdAndUpdateQueries
- [ ] Demo user - as a paid user
- [ ] insights page: only for paid users, has the ui blurred, says "Upgrade to premium or login as a paid user"
- [ ] goals tabluar view : check mantine ui table
- [ ] a little "i" in the Wallet label in add expense that tells user that selecting cash would deduct this ammount from their account balance
- [ ] Issue: Stripe Integration
- [ ] Issue: Doesn't work in brave browser
- [ ] Issue: repo link in project
- [ ] Issue: Logout toast notifications
- [ ] Issue: loading icons in GoalsDisplay & transactionDisplay
- [ ] filetype check in frontend when uploading avatar
- [ ] Issue: refreshing causes app to crash - vercel.json
- [ ] change html title and metadata to spendsync!
- [ ] add a password to protect the reset demo user thing
- [ ] get current user controller in backend
- [ ] get the latest user data in the App component
