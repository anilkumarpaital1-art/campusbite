import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";

function HomePage() {

const { user } = useContext(AppContext);
const navigate = useNavigate();

const handleExplore = () => {
if(user){
navigate("/select-location");
}else{
navigate("/login");
}
};

return (

<div className="bg-gradient-to-b from-gray-50 via-white to-gray-100">

{/* HERO SECTION */}

<section
className="relative min-h-screen flex items-center justify-center text-center"
style={{
backgroundImage:"url(https://images.unsplash.com/photo-1498654896293-37aacf113fd9)",
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

<div className="relative z-10 max-w-[900px] px-6">

<h1 className="text-7xl font-playfair font-bold text-white mb-4">
Campus<span className="text-yellow-400">Bite</span>
</h1>

<h2 className="text-2xl text-gray-200 mb-4">
{user ? `Welcome ${user.name}` : "Food Ordering Made Simple"}
</h2>

<p className="text-yellow-300 text-sm mb-4">
Chandigarh University • Smart Campus Dining
</p>

<p className="text-lg text-gray-300 max-w-[650px] mx-auto mb-10 leading-relaxed">
Order fresh meals from your campus restaurants without waiting in long queues. 
Browse menus, select dishes, and place your order instantly.
</p>

<button
onClick={handleExplore}
className="bg-yellow-400 text-black px-10 py-3 rounded-full font-semibold text-lg tracking-wide hover:scale-110 hover:shadow-2xl transition-all duration-300"
>
Grab Your Bite ➜
</button>

</div>

</section>

{/* WHY SECTION */}

<section className="max-w-[1400px] mx-auto px-8 py-24">

<h2 className="text-4xl font-bold text-center mb-16">
Why Choose CampusBite?
</h2>

<div className="grid md:grid-cols-4 gap-10">

{[
{title:"Fast Ordering",img:"https://images.unsplash.com/photo-1550547660-d9450f859349",desc:"Skip queues and order instantly."},
{title:"Multiple Canteens",img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",desc:"Explore all campus food courts."},
{title:"Fresh Meals",img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836",desc:"Freshly prepared and hygienic food."},
{title:"Secure Payments",img:"https://images.unsplash.com/photo-1556742393-d75f468bfcb0",desc:"Safe and seamless transactions."}
].map((card,i)=>(
<div key={i} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-4 transition duration-500 overflow-hidden">

<img src={card.img} className="h-44 w-full object-cover"/>

<div className="p-6">
<h3 className="text-xl font-semibold mb-2">{card.title}</h3>
<p className="text-gray-600 text-sm">{card.desc}</p>
</div>

</div>
))}

</div>

</section>

{/* ABOUT */}

<section className="py-28 bg-gradient-to-b from-white to-gray-50">

  <div className="max-w-[1400px] mx-auto px-10 grid md:grid-cols-2 gap-20 items-center">

    {/* 🔥 IMAGE (FULL, CLEAN, PREMIUM) */}
    <div className="flex justify-center">
      <img
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
        className="rounded-3xl shadow-2xl w-full max-w-[500px] object-cover hover:scale-[1.02] transition duration-500"
      />
    </div>

    {/* 🔥 TEXT CONTENT */}
    <div>

      <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        Built for{" "}
        <span className="text-yellow-500">
          Chandigarh University
        </span>
      </h2>

      <p className="text-gray-600 text-lg leading-8 mb-6">
        CampusBite transforms the way students experience food on campus. 
        Designed specifically for Chandigarh University, it connects all major 
        food hubs like Food Republic, A1, D6, and more into one seamless platform.
      </p>

      <p className="text-gray-600 text-lg leading-8 mb-6">
        Instead of waiting in long queues during peak hours, students can explore 
        menus, discover new dishes, and place orders instantly — all from their 
        phone or laptop.
      </p>

      <p className="text-gray-600 text-lg leading-8">
        Whether you're in a hurry between lectures or relaxing with friends, 
        CampusBite ensures your food is just a few clicks away — fast, simple, 
        and built for everyday campus life.
      </p>

    </div>

  </div>

</section>

{/* TESTIMONIALS */}

<section className="py-24 bg-gradient-to-b from-white to-gray-100">

<h2 className="text-4xl font-bold text-center mb-16">
What Students Say
</h2>

<div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-10 px-6">

{[
["Saved so much time during lunch!", "Manat Sharma"],
["Ordering is super easy now!", "Riya Sharma"],
["Clean UI and fast delivery!", "Rahul Verma"],
["Best campus food app ever!", "Simran Kaur"],
["Love ordering from A1!", "Aman Singh"],
["Food Republic feels faster!", "Priya Mehta"]
].map((t,i)=>(
<div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">

<p className="text-gray-600 text-sm mb-4">“{t[0]}”</p>
<h4 className="font-semibold">{t[1]}</h4>
<span className="text-xs text-gray-400">CU Student</span>

</div>
))}

</div>

</section>

{/* CONTACT */}

<section className="py-24 bg-gray-100">

<h2 className="text-3xl font-bold text-center mb-16">
Contact Us
</h2>

<div className="max-w-[1300px] mx-auto flex justify-between gap-16 px-8">

<div className="grid grid-cols-2 gap-6 w-[520px]">

{[
["📧","Email","campusbite@gmail.com"],
["📞","Phone","+91 9876543210"],
["📍","Location","Chandigarh University"],
["💬","Support","24/7 Assistance"],
["⏰","Hours","9 AM – 9 PM"],
["🍽","Restaurants","All Campus Vendors"]
].map((c,i)=>(
<div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
<div className="text-3xl mb-2">{c[0]}</div>
<h4 className="font-semibold">{c[1]}</h4>
<p className="text-gray-600 text-sm">{c[2]}</p>
</div>
))}

</div>

<ContactForm/>

</div>

</section>

</div>

);
}

export default HomePage;