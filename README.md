############# FOR EDUCATIONAL PURPOSES ONLY #############

# AntigravityVulnerableShop

This website and github repository was created by Mordecai Yeshayahu for the course "אבטחת מערכות Web" to showcase the recently discovered React2Shell vulnerability   
The website is built on React 19.0.0 and Next.js 15.0.0 which are pre-patched to the vulnerability.

It consists of a simple e-commerce website with a shopping cart, a checkout page and a fake user database and a user dashboard.
with local machine 'nosql' user database.

Using the React2Shell Python scripts uploaded to the repository, you can inject a malicious payload to the website and execute it on the user's machine through the server terminal.

commands.txt holds the script commands which show how can gain access to all the **fake** user data.

Full disclosure: The Python scripts in this repository are not made by me(Mordecai), the original authors of the scripts are credited inside the scripts.

Both scripts are used to showcase how hijacking the React Flight protocol can be used to execute malicious code on the server's machine.

both scripts use the same method of malicious payload generation by using callbacks through other functions to change the parameters of the original functions with the proper parsing can enable us to execute our commands on the machine hosting the server.


DO NOT USE FOR ILLEGAL PURPOSES. USE AT YOUR OWN RISK.


Instructions below for the *website setup only*


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Read Commands.txt

After deploying the website, you can use the Python scripts to inject a malicious payload to the website and execute it on the user's machine.




