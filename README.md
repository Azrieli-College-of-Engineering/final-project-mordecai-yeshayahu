############# FOR EDUCATIONAL PURPOSES ONLY #############

*It is recommended to watch the demo video for easier understanding*

# React2Shell -  E-commerce-VulnerableShop

This website and Github repository were created by Mordecai Yeshayahu

Course: "אבטחת מערכות Web"

To showcase the recently discovered React2Shell-(CVE-2025-55182) vulnerability for the **extremely popular** - React UX/UI web/app infrastrucutre.  

The vulnerable website is built on React 19.0.0 and Next.js 15.0.0 which are not-patched to the vulnerability.

# Exploit Pipeline
1. Target Identification: Locate a React or Next.js application running on vulnerable versions, specifically 19.0.0, 19.1.0, 19.1.1, or 19.2.0.
2. Payload Generation: Use the provided Python scripts to generate a serialized payload compatible with the React Flight protocol.
3. Injection: Submit the payload via a server action or a manipulated request header that the server-side renderer processes.
4. Execution: Once the server attempts to resolve the malicious component, the callback chain triggers the command execution on the host terminal.


## Explanation
This repo consists of version specific e-commerce website with a shopping cart, a checkout page, a fake user database and a user dashboard.
using a local machine with a 'no-sql' database.

The React2Shell Python scripts uploaded to the repository, can inject a malicious payload to the website and execute it on the user's machine through the server terminal.

commands.txt holds explanations and pre-made commands which show how can gain access to all the **fake** user data which is stored on the website.

*Full disclosure: The Python scripts to inject the payload in this repository were not made by me (Mordecai), the original authors of the scripts are credited in the files*

Both scripts are used to showcase how hijacking the React Flight protocol can be used to execute malicious code on the server's machine.

Both scripts use the same method of malicious payload generation by using callbacks through other functions to change the parameters of the original functions
which with the proper parsing can enable us to execute almost any commands on the machine hosting the server.


DO NOT USE FOR ILLEGAL PURPOSES. USE AT YOUR OWN RISK.


Instructions below for the *website setup + react2shell exploit*


## Running the website

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


## Read Commands.txt for exploit demonstration

After deploying the website, you can use the Python scripts to inject a malicious payload to the website and execute it on the user's machine.




