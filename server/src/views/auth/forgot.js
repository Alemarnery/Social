const layout = require("./layout");
const { nameError } = require("../helpers");

module.exports = ({ errors, email }) => {
  return layout({
    header: "Recovery your password",
    content: `
                  ${nameError(null, email, "positive")}  
                  
                  <form class="ui form error" method="POST" action="forgot">
                    <h5>Enter your email to recovery your password</h5>                  

                         <div class="required field">
                              <label>Email</label>
                              <input type="text" name="email" placeholder="Email">                        
                         </div>
                         ${nameError("email", errors)}

                         <button class="ui button" type="submit">Submit</button>
                    </form>`,
    extraContent: `<a href="/login"><i class="user icon"></i>Already have an account? Sign In
</a>`,
  });
};
