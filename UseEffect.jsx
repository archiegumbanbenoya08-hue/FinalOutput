useEffect(() => {
  axios
    .get("http://localhost/chie_api/api.php")
    .then((res) => {
      console.log(res.data); // 👈 Add this line
      setItems(res.data);
    })
    .catch((err) => console.error("Error fetching items:", err));
}, []);
