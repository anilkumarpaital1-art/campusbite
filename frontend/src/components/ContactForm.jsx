import { useState } from "react";

function ContactForm(){

const [form,setForm] = useState({
name:"",
email:"",
subject:"",
message:""
});

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = (e)=>{
e.preventDefault();

console.log(form);

alert("Message Sent Successfully!");

setForm({
name:"",
email:"",
subject:"",
message:""
});
};

return(

<div className="bg-white rounded-2xl shadow-xl p-10 w-[480px]">

<h3 className="text-xl font-semibold mb-6">
Send us a message
</h3>

<form onSubmit={handleSubmit} className="space-y-5">

{/* NAME */}

<div>

<label className="text-sm font-medium">
Full Name
</label>

<input
name="name"
value={form.name}
onChange={handleChange}
type="text"
placeholder="Enter your name"
className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
/>

</div>


{/* EMAIL */}

<div>

<label className="text-sm font-medium">
Email Address
</label>

<input
name="email"
value={form.email}
onChange={handleChange}
type="email"
placeholder="Enter your email"
className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
/>

</div>


{/* SUBJECT */}

<div>

<label className="text-sm font-medium">
Subject
</label>

<input
name="subject"
value={form.subject}
onChange={handleChange}
type="text"
placeholder="Message subject"
className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
/>

</div>


{/* MESSAGE */}

<div>

<label className="text-sm font-medium">
Message
</label>

<textarea
name="message"
value={form.message}
onChange={handleChange}
rows="4"
placeholder="Write your message..."
className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-yellow-400 outline-none"
/>

</div>


<button
type="submit"
className="w-full bg-yellow-400 text-black py-2.5 rounded-full font-semibold hover:shadow-md hover:scale-[1.02] transition"
>
Send Message
</button>

</form>

</div>

)

}

export default ContactForm;