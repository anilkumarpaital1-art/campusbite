import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";

function HomePage() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleExplore = () => {
    if (user) {
      navigate("/select-location");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100">

      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1498654896293-37aacf113fd9)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        <div className="relative z-10 w-full max-w-[900px]">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-3 leading-tight">
            Campus<span className="text-yellow-400">Bite</span>
          </h1>

          <h2 className="text-base sm:text-lg md:text-2xl text-gray-200 mb-3">
            {user ? `Welcome ${user.name}` : "Food Ordering Made Simple"}
          </h2>

          <p className="text-yellow-300 text-xs sm:text-sm mb-4">
            Chandigarh University • Smart Campus Dining
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-[600px] mx-auto mb-8 leading-relaxed px-2">
            Order fresh meals from your campus restaurants without waiting in long queues.
            Browse menus, select dishes, and place your order instantly.
          </p>

          <button
            onClick={handleExplore}
            className="bg-yellow-400 text-black px-8 sm:px-10 py-3 rounded-full font-semibold text-base sm:text-lg tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
          >
            Grab Your Bite ➜
          </button>

        </div>
      </section>

      {/* WHY SECTION */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 py-14 sm:py-20">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16">
          Why Choose CampusBite?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              title: "Fast Ordering",
              img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
              desc: "Skip queues and order instantly.",
            },
            {
              title: "Multiple Canteens",
              img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
              desc: "Explore all campus food courts.",
            },
            {
              title: "Fresh Meals",
              img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
              desc: "Freshly prepared and hygienic food.",
            },
            {
              title: "Secure Payments",
              img: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0",
              desc: "Safe and seamless transactions.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 overflow-hidden"
            >
              <img
                src={card.img}
                className="h-28 sm:h-36 md:h-44 w-full object-cover"
              />

              <div className="p-3 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold mb-1">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              className="rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[450px] object-cover"
            />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-5">
              Built for{" "}
              <span className="text-yellow-500">
                Chandigarh University
              </span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-7 mb-4">
              CampusBite transforms the way students experience food on campus. Designed specifically for Chandigarh University, 
              it connects all major food hubs like Food Republic, A1, D6, and more into one seamless platform.
            </p>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-7 mb-4">
              Instead of waiting in long queues during peak hours, students can explore menus, 
              discover new dishes, and place orders instantly — all from their phone or laptop.
            </p>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-7">
              Whether you're in a hurry between lectures or relaxing with friends, 
              CampusBite ensures your food is just a few clicks away — fast, simple, and built for everyday campus life.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
<section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-100">

  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16">
    What Students Say
  </h2>

  <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-4">

    {[
      ["Saved so much time during lunch!", "Manat Sharma"],
      ["Ordering is super easy now!", "Riya Sharma"],
      ["Clean UI and fast delivery!", "Rahul Verma"],
      ["Best campus food app ever!", "Simran Kaur"],
      ["Love ordering from A1!", "Aman Singh"],
      ["Food Republic feels faster!", "Priya Mehta"],
    ].map((t, i) => (
      <div
        key={i}
        className="bg-white p-3 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
      >
        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
          “{t[0]}”
        </p>
        <h4 className="font-semibold text-xs sm:text-base">{t[1]}</h4>
        <span className="text-[10px] sm:text-xs text-gray-400">
          CU Student
        </span>
      </div>
    ))}

  </div>
</section>

      {/* CONTACT */}
<section className="py-16 sm:py-24 bg-gray-100">

  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-16">
    Contact Us
  </h2>

  <div className="max-w-[1300px] mx-auto 
                  flex flex-col lg:flex-row 
                  justify-between gap-10 lg:gap-16 
                  px-4 sm:px-8">

    {/* LEFT CARDS */}
    <div className="grid grid-cols-2 gap-4 sm:gap-6 
                    w-full lg:w-[520px]">

      {[
        ["📧","Email","campusbite@gmail.com"],
        ["📞","Phone","+91 9876543210"],
        ["📍","Location","Chandigarh University"],
        ["💬","Support","24/7 Assistance"],
        ["⏰","Hours","9 AM – 9 PM"],
        ["🍽","Restaurants","All Campus Vendors"]
      ].map((c,i)=>(
        <div 
          key={i} 
          className="bg-white p-4 sm:p-6 rounded-xl shadow-md 
                     hover:shadow-lg transition text-center"
        >
          <div className="text-2xl sm:text-3xl mb-2">{c[0]}</div>
          <h4 className="font-semibold text-sm sm:text-base">{c[1]}</h4>
          <p className="text-gray-600 text-xs sm:text-sm">{c[2]}</p>
        </div>
      ))}

    </div>

    {/* FORM */}
    <div className="w-full max-w-[500px] mx-auto lg:mx-0">
      <ContactForm />
    </div>

  </div>

</section>

    </div>
  );
}

export default HomePage;