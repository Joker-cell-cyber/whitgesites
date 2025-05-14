import { Metadata } from "next";
import { COMPANY } from "../constants/company";

export const metadata: Metadata = {
  title: "About Us | DontBeNoob",
  description: "Learn about DontBeNoob and our mission to help gamers improve their skills",
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">About {COMPANY.serviceName}</h1>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          At {COMPANY.serviceName}, our mission is to empower gamers of all skill levels to reach their full potential through 
          expert coaching, personalized guidance, and actionable strategies. We believe everyone deserves the opportunity to 
          elevate their gameplay and experience the satisfaction of continuous improvement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
        <p className="mb-6">
          We envision a gaming community where skill development is accessible to anyone with the passion to improve. 
          {COMPANY.serviceName} strives to be the leading platform connecting dedicated gamers with expert coaches who can 
          transform their gaming experience through knowledge sharing and personalized instruction.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2"><strong>Excellence:</strong> We are committed to providing the highest quality coaching services that deliver measurable results.</li>
          <li className="mb-2"><strong>Personalization:</strong> We recognize that every gamer has unique needs, goals, and learning styles.</li>
          <li className="mb-2"><strong>Integrity:</strong> We operate with transparency, honesty, and professionalism in all our interactions.</li>
          <li className="mb-2"><strong>Innovation:</strong> We continuously refine our coaching methodologies based on the latest gaming trends and strategies.</li>
          <li className="mb-2"><strong>Community:</strong> We foster a supportive environment where gamers can connect, learn, and grow together.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Approach</h2>
        <p className="mb-6">
          {COMPANY.serviceName} takes a data-driven, results-oriented approach to gaming improvement. Our coaching methodology integrates:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li className="mb-2">Comprehensive skill assessment to identify strengths and areas for improvement</li>
          <li className="mb-2">Personalized coaching plans tailored to individual goals</li>
          <li className="mb-2">Actionable feedback and strategic recommendations</li>
          <li className="mb-2">Practical exercises and drills to reinforce new skills</li>
          <li className="mb-2">Regular progress tracking to ensure continuous improvement</li>
        </ul>

        <p className="mb-6">
          Whether you're looking to climb competitive rankings, master a new game, or simply enjoy more rewarding gameplay,
          {COMPANY.serviceName} is here to guide you on your journey to gaming excellence.
        </p>

        <div className="text-center mt-12 mb-6">
          <p>For inquiries, please contact us at:</p>
          <p>{COMPANY.email}</p>
          <p>{COMPANY.phone}</p>
        </div>
      </div>
    </div>
  );
} 