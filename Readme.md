### __Inicialize Repo__
git init

git config user.name \<username\>

git config user.email \<user@domain\>

git remote set-url origin git@github.com:inecsoft/terraform-course.git

ssh -T git@github.com

git add .

git commit -m "first commit"

git push

### __Add the public key on the repo__
git remote remove origin

git remote show origin

git config -l

git remote add origin git@github.com:inecsoft/terraform-course.git

git push -u origin master

### __To remove file from remote repo__
git checkout master
git rm -r folder-name
git commit -m "folder-name deleted"
git push origin master

### __Undo commits__
git log --oneline
* #### _The savest way to do it_
git chechout \<commit\>
* #### _Undo a commit_
git revert \<commit\>
* #### _Destroy the content_
git reset \<commit\>
git checkout master

### __Navigation branch__
git log --pretty=oneline --abbrev-commit
#to rollback to previos commit 
git reset HEAD~1
git rebase -i HEAD~6
#delete the line of the commit that you want to delete
git push
git pull
git push

### __Manage Branches__
* #### _Create branch_
git branch \<name of branch\>
* #### _Show branches_
git branch -a
* #### _Go to the a branch_
git checkout \<branch name\>
* #### _Get back to master branch_
git checkout master
* #### _Creates brand and select it (best practice)_
git checkout -b \<branch name\>
* #### _Delete branch when merged_
git branch -d \<branch name\>
* #### _Delete branch when branch is not merged with master_
git branch -D \<branch name\>

### __Merge into master__
git checkout master

git merge \<branch name\>
#### If error edit what you want to change and save
git add .

git commit -am "comments"

