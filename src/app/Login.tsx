"use client"
import { Card, Text, Subtitle, Divider, TextInput, Button } from '@tremor/react';
import { app, auth, db } from "../../firebase/ClientApp"
import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "./UserContext"

const Login = () => {

  const { user, setUser } = useUser()
  const storage = getStorage(app)
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('pas');
  const [downloadURL, setDownloadURL] = useState("");
  const [clicked, setClicked] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  let [disabled, setDisabled] = useState(false)
  const router = useRouter()
 
  const handleURL = () => {
    let url = prompt("Type the URL of the Image")
    setDownloadURL(url ? url : "")

  }

  const handleLogin = async () => {
    if (email && password) {
      const DocRef = query(collection(db, "Users"));
      const querySnapshot = await getDocs(DocRef);
      let emailFound = false; // Flag variable to track if email is found
      querySnapshot.docs.forEach((mail) => {
        let mails = mail.data();
        console.log(mail.id);
        if (mail.id === email) {
          emailFound = true; // Set flag to true if email is found
          if (mails.method === "Email") {
            if (mails.password === password) {
              const { name, email, photoURL } = mails; // Extract necessary fields
              setUser({ name, email, photoURL }); // Set user state with extracted fields
              console.log("User state updated:", { name, email, photoURL }); // Log the updated state
              router.push("/dashboard");
              router.push("/dashboard");
            } else {
              alert("The Password is incorrect");
            }
          } else {
            alert(`This Email is associated with ${mails.method}, So please try logging in with that method`);
          }
        }
      })


      // After loop, check if email is not found
      if (!emailFound) {
        alert("The Email May Be Incorrect");
      }
    } else {
      prompt("Please write your email and password");
    }
  };

  const handleCreateAccount = async () => {

    // Handle the logic for creating a new account here
    console.log("Create New Account button clicked!");
    console.log("Display Name:", displayName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Profile Photo:", profilePhoto);
    console.log("Profile Photo:", clicked);
    setDisabled(true)
    if (email && displayName && password != 'pas') {
      if (downloadURL == "") {
        const storageRef = ref(storage, 'profileImages/' + email);
        if (profilePhoto) {
          const uploadTask = uploadBytes(storageRef, profilePhoto);
          const userDocRef = doc(db, "Users", email);


          // Once the upload is complete, get the download URL
          uploadTask.then(async snapshot => {
            console.log("Snapshot", snapshot.ref)
            const downURL = await getDownloadURL(snapshot.ref);
            setDownloadURL(downURL)
            console.log("Download", downloadURL)
            // Set the document in Firestore with the download URL

            await addDataToDatabse(displayName, email, downloadURL)
            setClicked(!clicked)
            setDisabled(false)

          }).catch(error => {
            console.error('Error uploading file:', error);
          });
        }
      }
      else {
        await addDataToDatabse(displayName, email, downloadURL)
        setClicked(!clicked)
      }
    }
  }

  // You can add your logic here to handle the creation of a new account
  const handleGoogleLogin = async () => {
    let auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      await router.push("/dashboard")
      setUser(user)
    }
    catch (error) {
      console.error("Error Signing Into Google ", error)
    }
  }
  const addDataToDatabse = async (name: string, email: string, photoURL: any) => {
    try {

      const userDocRef = doc(db, "Users", email);

      if (password !== "pas") {
        await setDoc(userDocRef, {
          name: name,
          email: email,
          photoURL: photoURL,
          method: "Email",
          password: password
        });
      } else {
        // Set the document data using the user's email as the document ID
        await setDoc(userDocRef, {
          name: name,
          email: email,
          photoURL: photoURL,
          method: "Gmail"
        });
      }
      setUser(user)
      console.log("Data Posted To", userDocRef);




    } catch (error) {
      console.log("Error Adding Document", error)
    }
  }
  if (user != null) {
    router.push("/dashboard")
  }
  return (
    <>
      <aside className=" my-28">
        <Text className="text-blue-600 font-bold  text-7xl  text-center">
          AceBook
        </Text>
        <Subtitle className="text-wrap text-center align-bottom text-3xl font-medium ">

          Acebook helps you connect and<br />
          share with the people in your life.
        </Subtitle>
      </aside>
      {clicked ?
        <div className="flex justify-end mb-20 flex-nowrap px-20 py-10">
          <Card className="p-10 shadow-2xl">
            <TextInput className="font-medium pr-10 border-2 border-black border-opacity-10 cursor-pointer max-w-md w-full mb-5" placeholder="Display Name" type='text' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <TextInput className="font-medium pr-10 border-2 border-black border-opacity-10 cursor-pointer max-w-md w-full mb-5" placeholder="Email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextInput className="font-bold pr-10 border-2 border-black border-opacity-10 cursor-pointer max-w-md w-full mb-5" placeholder="Password" type="password" value={password != 'pas' ? password : ""} onChange={(e) => setPassword(e.target.value)} />
            <div className="flex gap-4">
              <input
                type='file'
                accept='image/'
                className="font-bold border-2 border-black border-opacity-10 cursor-pointer w-28 mb-5"
                placeholder="Profile Photo URL"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setProfilePhoto(file);
                }}
              />
              <span className='flex cursor-pointer my-2 underline text-black font-extrabold' onClick={handleURL}>Search or type URL</span>
            </div>


            <Button
              className="w-full text-center font-bold text-3xl"
              onClick={handleCreateAccount}
              disabled={disabled}
            >
              {disabled ? "Creating Account ..." : "Create New Account"}
            </Button>

            <Divider />
            <Button className="bg-green-600 flex justify-center content-center flex-wrap m-0 m-auto hover:bg-green-700 border-none" onClick={() => {
              setClicked(!clicked)
            }} >Log In</Button>
            <Button className="bg-white bg-opacity-10 flex justify-center content-center flex-wrap hover:bg-opacity-30 rounded-full text-black text-opacity-90 my-4 border-black mx-16" onClick={handleGoogleLogin}>Continue with Google</Button>
          </Card>
        </div>
        : <div className="flex justify-end mb-20 flex-nowrap px-20 py-10" >
          <Card className="p-10 shadow-2xl">
            <TextInput className="font-medium pr-10 border-2 border-black border-opacity-10 cursor-pointer max-w-md w-full mb-5" placeholder="Email or Username" value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <TextInput className=" font-bold pr-10 border-2 border-black border-opacity-10  cursor-pointer max-w-md w-full mb-5" placeholder="Password" type="password" value={password != 'pas' ? password : ""} onChange={(e) => setPassword(e.target.value)} />

            <Button className=" w-full text-center font-bold text-3xl" onClick={handleLogin} >Log In</Button>
            <Divider />
            <Button className=" bg-green-600 flex justify-center content-center flex-wrap m-0 m-auto  hover:bg-green-700 border-none " onClick={() => {
              setClicked(!clicked)
            }}>Create New Account</Button>
            <Button className=" bg-white  bg-opacity-10 flex justify-center content-center flex-wrap  hover:bg-opacity-30 rounded-full text-black text-opacity-90 my-4 border-black mx-16 " onClick={handleGoogleLogin} >Continue with Google</Button>
          </Card>
        </div>}

    </>
  )

}

export default Login;
