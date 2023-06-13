import React, { useEffect, useState } from "react";
import { useAuth} from "../context/AuthProvider";
import { supabase } from "../supabase/client";


const Home = () => {
  // console.log(supabase)
  const { user } = useAuth();
  // seleziono i dati dal database
  const [username, setUsername] = useState("");
  const [website,setWebsite]=useState("");


  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        // Esegui la query per ottenere l'username dall'utente corrente
        let { data, error } = await supabase
        .from('profiles')
        .select('username,website')


        if (error) {
          console.error("Errore durante il recupero dell'username:", error);
        } else if (data) {
          setUsername(data[0]?.username);
          setWebsite(data[0]?.website);
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div style={{ fontSize: "24px" }}>
      You are logged in and your email address is {user.email}
      <br />
      Hi! {username}
      <br/> {website}
    </div>
  );
};

export default Home;
