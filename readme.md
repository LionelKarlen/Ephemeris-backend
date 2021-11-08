## BACKEND
---
### Technologies
* nodejs
* express
* mongodb
* bcrypt
* uuid
* jwt
---
### Functions
* Remind demonstators of their upcoming engagements within the next week
	* > Run every wednesday
* Generate Engagements
	* > Run by admin
	* Archive all missing Engagements before generation
	* Add next 356 days worth of Engagements
* Add to Unable
	* > Run by each user
	* User bulk adds the unable days, the user id is added to the unable array of the engagement document
* Hand in report
	* > Run by demonstrator after the fact
	* Sets the visitor amount and removes potential deficits from the user.
* Generate schedule
	* > Run by admin
	* For each day:
		* ignore all unable
		* for all others:
			1. find highest deficit count
			2. find longest time since last demo
			3. choose random
---
### Database
> Store active data in db, archive the rest

#### Documents
* Users
	* Name: string
	* Email: string
	* Password (bcrypt?): string
	* ID (uuid): string
	* Deficit: number
* Engagement
	* Date: date
	* UserID: string
	* EngagementType: EngagementType
	* VisitorType: VisitorType
	* VisitorNumber: number
	* Unable: string[]
* Archive
	* Year: number
	* Sunlab: ArchiveCache
	* Regular: ArchiveCache 
	* Engagements: Engagements[]