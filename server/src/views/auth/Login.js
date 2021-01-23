const layout = require("./layout");
const { nameError, flashError } = require("../helpers");

module.exports = ({ errors, dbError }) => {
  return layout({
    header: "Sign In",
    content: ` ${dbError ? flashError(dbError) : ""} 
          
               <form class="ui form error" method="POST" action="login">
                    <div class="required field">
                         <label>Email</label>
                         <input type="text" name="email" placeholder="email"> 
                    </div>
                    ${nameError("email", errors)}                     

                    <div class="required field">
                         <label>Password</label>
                         <input type="text" name="password" placeholder="password" type="password" >
                    </div>
                    ${nameError("password", errors)}  
                    
                    <button class="ui button" type="submit">Submit</button>
               </form>`,
    extraContent: ` <a href="/register">
                         <i class="user icon"></i>
                         Don't have an account?
                    </a>
                    <a href="/forgot" class="right floated">
                         <i class="info icon"></i>
                         Forgot your password?
                    </a>
                    `,
  });
};
