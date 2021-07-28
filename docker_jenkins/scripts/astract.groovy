#!/home/inecsoft/.sdkman/candidates/groovy/current/bin/groovy

abstract class User{
    String lastName;
    String firstName;
    
    public String UserName(){
        return getUserName(this.firstName, this.lastName);
    }

    private String getUserName(String firstName, String lastName){
        return firstName.substring(0,1).toLowerCase() + lastName.toLowerCase();
    }
}

public class Artist extends User{
    public String[] Songs;
}

public class Producer extends User{
    public void Produce(){};
}

User[] users = [new Artist(firstName: "Bob", lastName: "Dylan"),
                new Artist(firstName: "Jeff", lastName: "Lynne"),
                new Artist(firstName: "Roy", lastName: "Orbison"),
                new Artist(firstName: "George", lastName: "Harrison"),
                new Artist(firstName: "Tom", lastName: "Petty")];

users.each(user -> println("UserName is ${user.UserName()}"));