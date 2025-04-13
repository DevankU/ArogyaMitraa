"use client"
import { useState, createContext, useContext } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {Button} from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade"
import IndiaGradient  from "@/components/ui/IndiaGradient"
import  GradientText  from "@/components/ui/GradientText"
import ShinyText from "@/components/ui/Shiny";
import InfiniteScrollingLogosAnimationReverse from "./components/revscroll";
import { Bot, MessageCircle, Activity } from "lucide-react"
// Icons
import { Heart, Shield, Clock, Star, Globe, ChevronDown, Menu, X } from "lucide-react"
import InfiniteScrollingLogosAnimation from "./components/scrolling";

// Create language context
const LanguageContext = createContext()

// Language provider component
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

// Custom hook to use language
const useLanguage = () => useContext(LanguageContext)

// Translations
const translations = {
  en: {
    nav: {
      home: "Home",
      features: "Features",
      demo: "Demo",
      contact: "Contact",
    },
    hero: {
      title: "Your Wellness,",
      titleGradient: "Our Passion",
      callUs: "Call Us: +1(920)-375-7113",
      description:
        "Health questions at 2 AM? We’ve got you.\n24/7 Multimodal assistants ready to chat, guide, and support in your language — no wait, no worries.",
      getStarted: "Get Started",
    },
    features: {
      title: "Features",
      heading: "How ArogyaMitra Helps You",
      description: "Our AI-powered platform provides comprehensive healthcare support with these key features",
      personalizedCare: {
        title: "Personalized Care",
        description: "Get healthcare recommendations tailored to your specific needs and medical history.",
      },
      availability: {
        title: "24/7 Availability",
        description: "Access healthcare assistance anytime, day or night, without waiting for appointments.",
      },
      secure: {
        title: "Secure & Private",
        description: "Your health data is protected with enterprise-grade security and HIPAA compliance.",
      },
    },
    video: {
      title: "Watch & Learn",
      heading: "See ArogyaMitra in Action",
      description: "Watch how our AI healthcare assistant can transform your healthcare experience",
      demo: "ArogyaMitra Demo",
      seeHow: "See how our AI assistant works",
      tryIt: "Try It Yourself",
    },
    testimonials: {
      title: "Testimonials",
      heading: "What Our Users Say",
      description: "Hear from people who have transformed their healthcare experience with ArogyaMitra",
    },
    cta: {
      heading: "Ready to transform your healthcare experience?",
      description: "Join thousands of users who have made ArogyaMitra their trusted health companion.",
      getStarted: "Get Started",
      contactUs: "Contact Us",
    },
    footer: {
      description:
        "AI-powered healthcare assistant available 24/7 to address your medical concerns and provide guidance with personalized care.",
      rights: "All rights reserved.",
      quickLinks: "Quick Links",
      contact: "Contact",
      designedWith: "Designed with ❤️ by DataWizards",
    },
    languageSelector: "Language",
  },
  hi: {
    nav: {
      home: "होम",
      features: "विशेषताएं",
      demo: "डेमो",
      contact: "संपर्क",
    },
    hero: {
      title: "आपका स्वास्थ्य,",
      titleGradient: "हमारी प्राथमिकता",
      callUs: "हमें कॉल करें: +1(920)-375-7113",
      description:
        "स्वास्थ्य सहायक 24/7 उपलब्ध है जो आपकी चिकित्सा चिंताओं को संबोधित करता है और मार्गदर्शन प्रदान करता है",
      getStarted: "शुरू करें",
    },
    features: {
      title: "विशेषताएं",
      heading: "आरोग्यमित्र आपकी कैसे मदद करता है",
      description: "हमारा AI-संचालित प्लेटफॉर्म इन प्रमुख विशेषताओं के साथ व्यापक स्वास्थ्य सहायता प्रदान करता है",
      personalizedCare: {
        title: "व्यक्तिगत देखभाल",
        description: "अपनी विशिष्ट आवश्यकताओं और चिकित्सा इतिहास के अनुरूप स्वास्थ्य सेवा सिफारिशें प्राप्त करें।",
      },
      availability: {
        title: "24/7 उपलब्धता",
        description: "अपॉइंटमेंट के लिए इंतजार किए बिना, दिन या रात किसी भी समय स्वास्थ्य सहायता प्राप्त करें।",
      },
      secure: {
        title: "सुरक्षित और निजी",
        description: "आपका स्वास्थ्य डेटा एंटरप्राइज-ग्रेड सुरक्षा और HIPAA अनुपालन के साथ संरक्षित है।",
      },
    },
    video: {
      title: "देखें और सीखें",
      heading: "आरोग्यमित्र को कार्य करते हुए देखें",
      description: "देखें कि हमारा AI स्वास्थ्य सहायक आपके स्वास्थ्य अनुभव को कैसे बदल सकता है",
      demo: "आरोग्यमित्र डेमो",
      seeHow: "देखें कि हमारा AI सहायक कैसे काम करता है",
      tryIt: "स्वयं प्रयास करें",
    },
    testimonials: {
      title: "प्रशंसापत्र",
      heading: "हमारे उपयोगकर्ता क्या कहते हैं",
      description: "उन लोगों से सुनें जिन्होंने आरोग्यमित्र के साथ अपने स्वास्थ्य अनुभव को बदल दिया है",
    },
    cta: {
      heading: "अपने स्वास्थ्य अनुभव को बदलने के लिए तैयार हैं?",
      description: "हजारों उपयोगकर्ताओं से जुड़ें जिन्होंने आरोग्यमित्र को अपना विश्वसनीय स्वास्थ्य साथी बनाया है।",
      getStarted: "शुरू करें",
      contactUs: "संपर्क करें",
    },
    footer: {
      description:
        "AI-संचालित स्वास्थ्य सहायक 24/7 उपलब्ध है जो आपकी चिकित्सा चिंताओं को संबोधित करता है और व्यक्तिगत देखभाल के साथ मार्गदर्शन प्रदान करता है।",
      rights: "सर्वाधिकार सुरक्षित।",
      quickLinks: "त्वरित लिंक",
      contact: "संपर्क",
      designedWith: "डेटाविज़ार्ड्स द्वारा ❤️ के साथ डिज़ाइन किया गया",
    },
    languageSelector: "भाषा",
  },
  mr: {
    nav: {
      home: "मुख्यपृष्ठ",
      features: "वैशिष्ट्ये",
      demo: "डेमो",
      contact: "संपर्क",
    },
    hero: {
      title: "तुमचे आरोग्य,",
      titleGradient: "आमची प्राथमिकता",
      callUs: "आम्हाला कॉल करा: +1(920)-375-7113",
      description: "आरोग्य सहाय्यक 24/7 उपलब्ध आहे जो तुमच्या वैद्यकीय समस्यांचे निराकरण करतो आणि मार्गदर्शन प्रदान करतो",
      getStarted: "सुरू करा",
    },
    features: {
      title: "वैशिष्ट्ये",
      heading: "आरोग्यमित्र तुम्हाला कसे मदत करते",
      description: "आमचे AI-संचालित प्लॅटफॉर्म या प्रमुख वैशिष्ट्यांसह सर्वसमावेशक आरोग्य सहाय्य प्रदान करते",
      personalizedCare: {
        title: "वैयक्तिक काळजी",
        description: "तुमच्या विशिष्ट गरजा आणि वैद्यकीय इतिहासानुसार आरोग्य सेवा शिफारसी मिळवा.",
      },
      availability: {
        title: "24/7 उपलब्धता",
        description: "अपॉइंटमेंटची वाट न पाहता, दिवसा किंवा रात्री कधीही आरोग्य सहाय्य मिळवा.",
      },
      secure: {
        title: "सुरक्षित आणि खाजगी",
        description: "तुमचा आरोग्य डेटा एंटरप्राइझ-ग्रेड सुरक्षा आणि HIPAA अनुपालनासह संरक्षित आहे.",
      },
    },
    video: {
      title: "पहा आणि शिका",
      heading: "आरोग्यमित्र कार्यरत पहा",
      description: "आमचा AI आरोग्य सहाय्यक तुमचा आरोग्य अनुभव कसा बदलू शकतो ते पहा",
      demo: "आरोग्यमित्र डेमो",
      seeHow: "आमचा AI सहाय्यक कसा कार्य करतो ते पहा",
      tryIt: "स्वतः प्रयत्न करा",
    },
    testimonials: {
      title: "अभिप्राय",
      heading: "आमचे वापरकर्ते काय म्हणतात",
      description: "आरोग्यमित्रासह त्यांचा आरोग्य अनुभव बदललेल्या लोकांकडून ऐका",
    },
    cta: {
      heading: "तुमचा आरोग्य अनुभव बदलण्यासाठी तयार आहात?",
      description: "हजारो वापरकर्त्यांसह सामील व्हा ज्यांनी आरोग्यमित्र त्यांचा विश्वासू आरोग्य साथीदार बनवला आहे.",
      getStarted: "सुरू करा",
      contactUs: "संपर्क करा",
    },
    footer: {
      description:
        "AI-संचालित आरोग्य सहाय्यक 24/7 उपलब्ध आहे जो तुमच्या वैद्यकीय समस्यांचे निराकरण करतो आणि वैयक्तिक काळजीसह मार्गदर्शन प्रदान करतो.",
      rights: "सर्व हक्क राखीव.",
      quickLinks: "त्वरित दुवे",
      contact: "संपर्क",
      designedWith: "डेटाविझार्ड्स द्वारे ❤️ सह डिझाइन केले",
    },
    languageSelector: "भाषा",
  },
  pa: {
    nav: {
      home: "ਹੋਮ",
      features: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
      demo: "ਡੈਮੋ",
      contact: "ਸੰਪਰਕ",
    },
    hero: {
      title: "ਤੁਹਾਡੀ ਸਿਹਤ,",
      titleGradient: "ਸਾਡੀ ਤਰਜੀਹ",
      callUs: "ਸਾਨੂੰ ਕਾਲ ਕਰੋ: +1(920)-375-7113",
      description: "ਸਿਹਤ ਸਹਾਇਕ 24/7 ਉਪਲਬਧ ਹੈ ਜੋ ਤੁਹਾਡੀਆਂ ਮੈਡੀਕਲ ਚਿੰਤਾਵਾਂ ਨੂੰ ਹੱਲ ਕਰਦਾ ਹੈ ਅਤੇ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ",
      getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
    },
    features: {
      title: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
      heading: "ਆਰੋਗਯਮਿਤਰ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰਦਾ ਹੈ",
      description: "ਸਾਡਾ AI-ਸੰਚਾਲਿਤ ਪਲੇਟਫਾਰਮ ਇਹਨਾਂ ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਨਾਲ ਵਿਆਪਕ ਸਿਹਤ ਸਹਾਇਤਾ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ",
      personalizedCare: {
        title: "ਨਿੱਜੀ ਦੇਖਭਾਲ",
        description: "ਆਪਣੀਆਂ ਵਿਸ਼ੇਸ਼ ਜ਼ਰੂਰਤਾਂ ਅਤੇ ਮੈਡੀਕਲ ਇਤਿਹਾਸ ਦੇ ਅਨੁਸਾਰ ਸਿਹਤ ਸੇਵਾ ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",
      },
      availability: {
        title: "24/7 ਉਪਲਬਧਤਾ",
        description: "ਅਪੌਇੰਟਮੈਂਟਾਂ ਦੀ ਉਡੀਕ ਕੀਤੇ ਬਿਨਾਂ, ਦਿਨ ਜਾਂ ਰਾਤ ਕਿਸੇ ਵੀ ਸਮੇਂ ਸਿਹਤ ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰੋ।",
      },
      secure: {
        title: "ਸੁਰੱਖਿਅਤ ਅਤੇ ਨਿੱਜੀ",
        description: "ਤੁਹਾਡਾ ਸਿਹਤ ਡੇਟਾ ਐਂਟਰਪ੍ਰਾਈਜ਼-ਗ੍ਰੇਡ ਸੁਰੱਖਿਆ ਅਤੇ HIPAA ਅਨੁਪਾਲਨ ਨਾਲ ਸੁਰੱਖਿਅਤ ਹੈ।",
      },
    },
    video: {
      title: "ਦੇਖੋ ਅਤੇ ਸਿੱਖੋ",
      heading: "ਆਰੋਗਯਮਿਤਰ ਨੂੰ ਕਾਰਵਾਈ ਵਿੱਚ ਦੇਖੋ",
      description: "ਦੇਖੋ ਕਿ ਸਾਡਾ AI ਸਿਹਤ ਸਹਾਇਕ ਤੁਹਾਡੇ ਸਿਹਤ ਅਨੁਭਵ ਨੂੰ ਕਿਵੇਂ ਬਦਲ ਸਕਦਾ ਹੈ",
      demo: "ਆਰੋਗਯਮਿਤਰ ਡੈਮੋ",
      seeHow: "ਦੇਖੋ ਕਿ ਸਾਡਾ AI ਸਹਾਇਕ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
      tryIt: "ਖੁਦ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    },
    testimonials: {
      title: "ਪ੍ਰਸ਼ੰਸਾਪੱਤਰ",
      heading: "ਸਾਡੇ ਉਪਭੋਗਤਾ ਕੀ ਕਹਿੰਦੇ ਹਨ",
      description: "ਉਹਨਾਂ ਲੋਕਾਂ ਤੋਂ ਸੁਣੋ ਜਿਨ੍ਹਾਂ ਨੇ ਆਰੋਗਯਮਿਤਰ ਨਾਲ ਆਪਣੇ ਸਿਹਤ ਅਨੁਭਵ ਨੂੰ ਬਦਲ ਦਿੱਤਾ ਹੈ",
    },
    cta: {
      heading: "ਆਪਣੇ ਸਿਹਤ ਅਨੁਭਵ ਨੂੰ ਬਦਲਣ ਲਈ ਤਿਆਰ ਹੋ?",
      description: "ਹਜ਼ਾਰਾਂ ਉਪਭੋਗਤਾਵਾਂ ਨਾਲ ਜੁੜੋ ਜਿਨ੍ਹਾਂ ਨੇ ਆਰੋਗਯਮਿਤਰ ਨੂੰ ਆਪਣਾ ਭਰੋਸੇਮੰਦ ਸਿਹਤ ਸਾਥੀ ਬਣਾਇਆ ਹੈ।",
      getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
      contactUs: "ਸੰਪਰਕ ਕਰੋ",
    },
    footer: {
      description:
        "AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਸਹਾਇਕ 24/7 ਉਪਲਬਧ ਹੈ ਜੋ ਤੁਹਾਡੀਆਂ ਮੈਡੀ���ਲ ਚਿੰਤਾਵਾਂ ਨੂੰ ਹੱਲ ਕਰਦਾ ਹੈ ਅਤੇ ਨਿੱਜੀ ਦੇਖਭਾਲ ਨਾਲ ਮਾਰਗਦਰਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।",
      rights: "ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।",
      quickLinks: "ਤੇਜ਼ ਲਿੰਕ",
      contact: "ਸੰਪਰਕ",
      designedWith: "ਡੇਟਾਵਿਜ਼ਾਰਡਸ ਦੁਆਰਾ ❤️ ਨਾਲ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਗਿਆ",
    },
    languageSelector: "ਭਾਸ਼ਾ",
  },
  ta: {
    nav: {
      home: "முகப்பு",
      features: "அம்சங்கள்",
      demo: "டெமோ",
      contact: "தொடர்பு",
    },
    hero: {
      title: "உங்கள் ஆரோக்கியம்,",
      titleGradient: "எங்கள் முன்னுரிமை",
      callUs: "எங்களை அழைக்கவும்: +1(920)-375-7113",
      description: "உங்கள் மருத்துவ கவலைகளை நிவர்த்தி செய்து வழிகாட்டுதல் வழங்க 24/7 கிடைக்கும் AI-இயக்கப்படும் சுகாதார உதவியாளர்",
      getStarted: "தொடங்குங்கள்",
    },
    features: {
      title: "அம்சங்கள்",
      heading: "ஆரோக்யமித்ரா உங்களுக்கு எவ்வாறு உதவுகிறது",
      description: "எங்களின் AI-இயக்கப்படும் தளம் இந்த முக்கிய அம்சங்களுடன் விரிவான சுகாதார ஆதரவை வழங்குகிறது",
      personalizedCare: {
        title: "தனிப்பயனாக்கப்பட்ட பராமரிப்பு",
        description: "உங்கள் குறிப்பிட்ட தேவைகள் மற்றும் மருத்துவ வரலாற்றுக்கு ஏற்ப சுகாதார பரிந்துரைகளைப் பெறுங்கள்.",
      },
      availability: {
        title: "24/7 கிடைக்கும் தன்மை",
        description: "சந்திப்புகளுக்காக காத்திருக்காமல், பகல் அல்லது இரவு எந்த நேரத்திலும் சுகாதார உதவியை அணுகவும்.",
      },
      secure: {
        title: "பாதுகாப்பான & தனிப்பட்ட",
        description: "உங்கள் சுகாதார தரவு நிறுவன-தர பாதுகாப்பு மற்றும் HIPAA இணக்கத்துடன் பாதுகாக்கப்படுகிறது.",
      },
    },
    video: {
      title: "பார்த்து கற்றுக்கொள்ளுங்கள்",
      heading: "ஆரோக்யமித்ராவை செயலில் காணுங்கள்",
      description: "எங்கள் AI சுகாதார உதவியாளர் உங்கள் சுகாதார அனுபவத்தை எவ்வாறு மாற்றக்கூடும் என்பதைப் பாருங்கள்",
      demo: "ஆரோக்யமித்ரா டெமோ",
      seeHow: "எங்கள் AI உதவியாளர் எவ்வாறு செயல்படுகிறது என்பதைப் பாருங்கள்",
      tryIt: "நீங்களே முயற்சி செய்யுங்கள்",
    },
    testimonials: {
      title: "சான்றுகள்",
      heading: "எங்கள் பயனர்கள் என்ன சொல்கிறார்கள்",
      description: "ஆரோக்யமித்ராவுடன் தங்கள் சுகாதார அனுபவத்தை மாற்றிய மக்களிடமிருந்து கேளுங்கள்",
    },
    cta: {
      heading: "உங்கள் சுகாதார அனுபவத்தை மாற்ற தயாரா?",
      description: "ஆரோக்யமித்ராவை தங்கள் நம்பகமான சுகாதார துணையாக மாற்றிய ஆயிரக்கணக்கான பயனர்களுடன் இணையுங்கள்.",
      getStarted: "தொடங்குங்கள்",
      contactUs: "தொடர்பு கொள்ளுங்கள்",
    },
    footer: {
      description:
        "உங்கள் மருத்துவ கவலைகளை நிவர்த்தி செய்து தனிப்பயனாக்கப்பட்ட பராமரிப்புடன் வழிகாட்டுதல் வழங்க 24/7 கிடைக்கும் AI-இயக்கப்படும் சுகாதார உதவியாளர்.",
      rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      quickLinks: "விரைவு இணைப்புகள்",
      contact: "தொடர்பு",
      designedWith: "டேட்டாவிசார்ட்ஸ் மூலம் ❤️ உடன் வடிவமைக்கப்பட்டது",
    },
    languageSelector: "மொழி",
  },
}



// Language selector component
const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "mr", name: "मराठी" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "ta", name: "தமிழ்" },
  ]

  return (
    <div className="relative">
      <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(!isOpen)}>
        <Globe size={16} />
        <span>{languages.find((l) => l.code === language)?.name}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Header Component
const Header = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 to-green-50 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 text-3xl">
            <img src="logoipsum-custom-logo.svg" alt="ArogyaMitra Logo" className="h-10 w-10" />
            <IndiaGradient>ArogyaMitra</IndiaGradient>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                {t.nav.home}
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">
                {t.nav.features}
              </Link>
              <Link href="#video-section" className="text-gray-600 hover:text-blue-500 transition-colors">
                {t.nav.demo}
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-500 transition-colors">
                {t.nav.contact}
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSelector />

              <Button
                asChild
                variant="ghost"
                className="text-white p-2 bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] backdrop-blur-sm rounded-3xl"
              >
                <Link href="/handler/signup">Login</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <button className="text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="#features"
                className="text-gray-600 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.features}
              </Link>
              <Link
                href="#video-section"
                className="text-gray-600 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.demo}
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 hover:text-blue-500 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>

              <Button
                asChild
                variant="ghost"
                className="text-white p-2 bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] backdrop-blur-sm rounded-3xl w-full mt-2"
              >
                <Link href="/handler/signup">Login</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

// Dummy Contact Component
const Contact = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="contact-section">
      <div className="contact-header">
        <h2 className="text-gray-500">{t.footer.contact}</h2>
      </div>
      <div className="contact-container">
        <div className="contact-item">
          <div className="contact-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div className="contact-info">
            <p>aravsaxena884@gmail.com</p>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div className="contact-info">
            <p>+91 96534 13126</p>
          </div>
        </div>
        <div className="contact-item">
          <div className="contact-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="contact-info">
            <p>Pune, India</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Dummy DeveloperInfo Component
const DeveloperInfo = () => {
  return (
    <div className="developer-info text-center ">
      <h3 className="section-title text-gray-500">Developer Info</h3>
      <div className="developer-container">
        <div className="developer-grid">
          <div className="developer-card">
            <div className="developer-image">
              <img src="/arav.jpg" alt="Developer" />
            </div>
            <h4 className="developer-name"><IndiaGradient>Arav Saxena</IndiaGradient></h4>
            <p className="developer-role">Lead Developer</p>
            <p className="developer-bio">Full-stack developer with expertise in AI and healthcare solutions.</p>
            <div className="developer-links">
              <a href="#" className="dev-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="dev-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hero Section Component
const HeroSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="mt-15 ">
      <BlurFade delay={0.7} inView>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-12 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
            {t.hero.title}
            <GradientText>{t.hero.titleGradient}</GradientText>
          </h1>
          <p className="text-gray-500 md:text-2xl font-medium">{t.hero.callUs}</p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t.hero.description}</p>
          <Button
            asChild
            variant="ghost"
            className="text-white p-6 pl-16 pr-16 bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] backdrop-blur-sm rounded-3xl"
          >
            <Link href="/handler/signup">{t.hero.getStarted}</Link>
          </Button>
        </div>
      </BlurFade>
      <BlurFade delay={0.7} inView>
      <div className="flex flex-col gap-0 m-0 p-0">
  <div className="m-0 p-0 border-none">
    <InfiniteScrollingLogosAnimation />
  </div>
  <div className="m-0 p-0 border-none">
    <InfiniteScrollingLogosAnimationReverse />
  </div>
</div>
      </BlurFade>
    </div>
  )
}

// Features Section Component
const FeaturesSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const features = [
    {
      icon: <Heart className="w-10 h-10 text-red-500" />,
      title: t.features.personalizedCare.title,
      description: t.features.personalizedCare.description,
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-500" />,
      title: t.features.availability.title,
      description: t.features.availability.description,
    },
    {
      icon: <Shield className="w-10 h-10 text-green-500" />,
      title: t.features.secure.title,
      description: t.features.secure.description,
    },
  ]

  return (
    <section id="features" className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              {t.features.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>{t.features.heading}</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.features.description}</p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.2} inView>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6 p-4 rounded-full bg-gray-50 inline-block">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

// YouTube Video Section Component
const YouTubeSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="video-section" className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
              {t.video.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>{t.video.heading}</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.video.description}</p>
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/hhQl0uk_IxQ"
                title={t.video.demo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold">{t.video.demo}</h3>
                <p>{t.video.seeHow}</p>
              </div>
            </div>
          </div>
        </BlurFade>

        <div className="mt-12 text-center">
          <Button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all duration-300">
            <Link href="/handler/signup">{t.video.tryIt}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


const TryChatbotSection = () => {
  return (
    <section
      id="try-chatbot"
      className="py-20 bg-gradient-to-r from-blue-50 to-green-50 mt-10 rounded-3xl"
    >
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-600 text-sm font-medium mb-4">
              Chat with ArogyaMitra
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>Want to Try Our Chatbot?</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet <span className="font-semibold text-gradient-to-r from-blue-500 to-green-500">ArogyaMitra</span> — your smart AI health assistant. Whether you're curious about symptoms, conditions, or just need guidance, our chatbot is here 24/7.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <BlurFade delay={0.5} inView>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Bot className="w-10 h-10 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Human-Like Responses</h3>
              <p className="text-gray-600">
                ArogyaMitra understands context and health concerns using advanced natural language processing.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.7} inView>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <MessageCircle className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Instant Conversations</h3>
              <p className="text-gray-600">
                Get quick and accurate responses—just like talking to a real medical assistant.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.9} inView>
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Activity className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                No wait times. No queues. Your virtual health assistant is always here for you.
              </p>
            </div>
          </BlurFade>
        </div>

        {/* CTA Button */}
        <BlurFade delay={1.2} inView>
          <div className="mt-16 text-center">
            <Link href="/chatbot" passHref>
              <button className="px-6 py-3 bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] text-white rounded-full hover:shadow-lg transition-all duration-300">
                Try ArogyaBot
              </button>
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}



// Testimonials Section Component
const TestimonialsSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const testimonials = [
    {
      quote:
        "ArogyaMitra has been a game-changer for managing my chronic condition. The 24/7 access to healthcare guidance gives me peace of mind.",
      author: "Priya Sharma",
      role: "Patient",
      avatar: "/6703cd7c7b076c4bbe2e39910a4f5807.jpg?height=60&width=60",
    },
    {
      quote:
        "As a busy professional, I appreciate how ArogyaMitra helps me monitor my health and provides timely reminders for medications and check-ups.",
      author: "Rahul Patel",
      role: "Business Executive",
      avatar: "/axa.jpeg?height=60&width=60",
    },
    {
      quote:
        "The personalized care recommendations have helped my elderly parents manage their health better, even when I can't be physically present with them.",
      author: "Anita Desai",
      role: "Caregiver",
      avatar: "/asojaK.jpg?height=60&width=60",
    },
  ]

  return (
    <section className="py-20 bg-bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-yellow-50 text-yellow-600 text-sm font-medium mb-4">
              {t.testimonials.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <GradientText>{t.testimonials.heading}</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.testimonials.description}</p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.2} inView>
              <motion.div whileHover={{ y: -10 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

// Call to Action Section Component
const CTASection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.3} inView>
          <div className="bg-white rounded-3xl p-12 shadow-xl max-w-5xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-blue-50 to-green-50 opacity-50 rounded-l-full"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <GradientText>{t.cta.heading}</GradientText>
                </h2>
                <p className="text-xl text-gray-600 mb-6">{t.cta.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Button className="px-8 py-3 bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] text-white rounded-full hover:shadow-lg transition-all duration-300">
                    <Link href="/dashboard">{t.cta.getStarted}</Link>
                  </Button>
                  <Button variant="outline" className="px-8 py-3 border-2 rounded-full">
                    <Link href="#contact">{t.cta.contactUs}</Link>
                  </Button>
                </div>
              </div>

              <div className="w-full md:w-1/3 flex justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src="/nurse.png?height=350&width=350"
                    alt="Healthcare illustration"
                    className="w-60 h-60"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={1.2} inView>
      </BlurFade>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer id="contact" className="py-10 bg-gradient-to-r from-blue-50 to-green-50 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="logoipsum-custom-logo.svg?height=40&width=40" alt="logo" width={40} height={35} />
              <IndiaGradient className="text-2xl font-semibold">ArogyaMitra</IndiaGradient>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">{t.footer.description}</p>
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} ArogyaMitra. {t.footer.rights}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t.nav.features}
                </Link>
              </li>
              <li>
                <Link href="#video-section" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t.nav.demo}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                aravsaxena884@gmail.com
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 96534 13126
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Pune, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">{t.footer.designedWith}</p>

          <div className="flex gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/arav7781"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 
      0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 
      1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.334-5.467-5.933 
      0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 0 1 3-.404c1.02.005 
      2.045.138 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 
      1.235 3.22 0 4.61-2.807 5.63-5.48 5.922.43.37.823 1.102.823 2.222 
      0 1.606-.015 2.896-.015 3.286 0 .32.218.694.825.576C20.565 21.795 
      24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.instagram.com/arav_6555"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 
                  2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 
                  5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 
                  1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}

// Main LandingPage Component
const LandingPage = () => {
  return (
    <LanguageProvider>
      <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen ">
        <Header />

        {/* Hero Section with Enhanced Animation */}
        <HeroSection />
        <TryChatbotSection />
        <FeaturesSection />

        {/* YouTube Video Section */}
        <YouTubeSection />

        {/* Testimonials with Animation */}
        <TestimonialsSection />

        {/* Call to Action */}
        <CTASection />
        <hr className="my-10" />
        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default LandingPage
