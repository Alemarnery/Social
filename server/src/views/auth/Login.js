const layout = require("./layout");
const { nameError } = require("../helpers");

module.exports = ({ errors, dbError }) => {
  return layout({
    header: "Sign In",
    content: `${dbError ? nameError(null, dbError) : ""}           
               <form class="ui form error" method="POST" action="login">

                    <div class="field center aligned">
                         <a class="ui negative basic button" href="/googleSingIn">
                              <i class="google  icon"></i>
                              Google 
                         </a>
          
          
                         <button class="ui secondary basic button">
                              <i class="envelope outline icon"></i>
                              Email Link
                         </button>
          
          
                         <button class="ui facebook button">
                              <i class="facebook icon"></i>
                              Facebook
                         </button>
          
          
                         <button class="ui twitter button">
                              <i class="twitter icon"></i>
                              Twitter
                         </button>
                    </div>
                                        
                    <div class="required field">
                         <label>Email</label>
                         <input type="text" name="email" placeholder="email"> 
                    </div>
                    ${nameError("email", errors)}                     

                    <div class="required field">
                         <label>Password</label>
                         <input type="password" name="password" placeholder="password" type="password" >
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
