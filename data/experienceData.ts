export interface Experience {
  category: "education" | "platforms" | "competitions" | "certifications" | "activities";
  title: string;
  titleTh: string;
  role: string;
  roleTh: string;
  period: string;
  location: string;
  description: string;
  descriptionTh: string;
  achievements: string[];
  achievementsTh: string[];
  image?: string; // Image is optional
  link?: string;  // Link is optional
}



// แยก array ของแต่ละ section
export const education: Experience[] = [
  {
    category: "education",
    title: "Bangkok University",
    titleTh: "มหาวิทยาลัยกรุงเทพ",
    role: "Bachelor of Computer Science (Data Science & Cybersecurity)",
    roleTh: "วิทยาศาสตรบัณฑิต วิทยาการคอมพิวเตอร์ (วิทยาศาสตร์ข้อมูลและไซเบอร์ซีเคียวริตี้)",
    period: "2021 - 2025",
    location: "Bangkok, Thailand",
    description: "Cum GPA 3.66",
    descriptionTh: "เกรดเฉลี่ย 3.66",
    achievements: [
      "Specialized in Data Science and Cybersecurity",
      "Hands-on experience with penetration testing",
      "Strong foundation in programming and security",
    ],
    achievementsTh: [
      "เชี่ยวชาญด้านวิทยาศาสตร์ข้อมูลและไซเบอร์ซีเคียวริตี้",
      "ประสบการณ์ปฏิบัติจริงในการทดสอบเจาะระบบ",
      "พื้นฐานที่แข็งแกร่งในการเขียนโปรแกรมและความปลอดภัย",
    ],
    link: undefined
  }
];


export const competitions: Experience[] = [
  {
    category: "competitions",
    title: "Thailand  Cyber Top Talent 2024",
    titleTh: "การแข่งขัน Thailand Cyber Top Talent 2024",
    role: "Participant",
    roleTh: "ผู้เข้าร่วม",
    period: "2024",
    location: "Home",
    description: "Participated in the Thailand Cyber Top Talent competition organized by the National Cyber Security Agency (NCSA) in collaboration with Huawei Technologies (Thailand) Co., Ltd.",
    descriptionTh: "เข้าร่วมการแข่งขัน Thailand Cyber Top Talent ที่จัดโดยสำนักงานคณะกรรมการการรักษาความมั่นคงปลอดภัยไซเบอร์แห่งชาติ ร่วมกับบริษัท หัวเว่ย เทคโนโลยี่ (ประเทศไทย) จำกัด",
    achievements: [
      "Gained practical experience in cybersecurity challenges",
      "Collaborated with team members to solve complex problems",
      "Developed skills in penetration testing and vulnerability assessment"
    ],
    achievementsTh: [
      "ได้รับประสบการณ์จริงในการท้าทายด้านไซเบอร์ซีเคียวริตี้",
      "ทำงานร่วมกับสมาชิกทีมเพื่อแก้ปัญหาที่ซับซ้อน",
      "พัฒนาทักษะในการทดสอบเจาะระบบและการประเมินช่องโหว่"
    ],
    image: "/individual_rank.jpg",
    link: undefined,
  },
  {
    category: "competitions",
    title: "BU MINI CTF (Internal Competition)",
    titleTh: "BU MINI CTF (การแข่งขันภายใน)",
    role: "Participant",
    roleTh: "ผู้เข้าร่วม",
    period: "2024",
    location: "Bangkok University",
    description: "Participated in Capture the Flag competition organized by Bangkok University Cybersecurity group",
    descriptionTh: "เข้าร่วมการแข่งขัน Capture the Flag ที่จัดโดยกลุ่มไซเบอร์ซีเคียวริตี้มหาวิทยาลัยกรุงเทพ",
    achievements: [
      "Solved challenges related to web vulnerabilities",
      "Applied steganography and exploitation techniques",
      "Enhanced teamwork and problem-solving abilities"
    ],
    achievementsTh: [
      "แก้ความท้าทายที่เกี่ยวข้องกับช่องโหว่เว็บ",
      "ใช้เทคนิคสเตกาโนกราฟีและการโจมตี",
      "เพิ่มความสามารถในการทำงานเป็นทีมและการแก้ปัญหา"
    ],
    image: "/buctf.jpg",
    link: undefined,
  }
];
export const certifications: Experience[] = [
  {
    category: "certifications",
    title: "Certificate in Cybersecurity",
    titleTh: "ใบรับรองด้านไซเบอร์ซีเคียวริตี้",
    role: "Professional Certificate",
    roleTh: "ใบรับรองวิชาชีพ",
    period: "2025",
    location:"ISC2",
    description: "Professional certification in cybersecurity from ISC2",
    descriptionTh: "ใบรับรองวิชาชีพด้านไซเบอร์ซีเคียวริตี้จาก ISC2",
    achievements: [
      "In-depth knowledge of cybersecurity principles",
      "Hands-on experience with security tools",
      "Prepared for advanced cybersecurity roles"
    ],
    achievementsTh: [
      "ความรู้เชิงลึกเกี่ยวกับหลักการไซเบอร์ซีเคียวริตี้",
      "ประสบการณ์ปฏิบัติจริงกับเครื่องมือความปลอดภัย",
      "เตรียมพร้อมสำหรับบทบาทไซเบอร์ซีเคียวริตี้ขั้นสูง"
    ],
    image: "/cc.png",
    link: "https://www.credly.com/badges/a1e9ff50-dc52-43ee-ab5c-6fcb1c066b55/public_url",
  },
  {
    category: "certifications",
    title: "Basic Cyber Security",
    titleTh: "ไซเบอร์ซีเคียวริตี้พื้นฐาน",
    role: "Certificate of Complete",
    roleTh: "ใบรับรองการสำเร็จการศึกษา",
    period: "2023",
    location: "NCSA Thailand",
    description: "Comprehensive cybersecurity fundamentals certification",
    descriptionTh: "ใบรับรองพื้นฐานไซเบอร์ซีเคียวริตี้อย่างครอบคลุม",
    achievements: [
      "Learned cybersecurity fundamentals",
      "Understanding of threat landscape",
      "Security best practices"
    ],
    achievementsTh: [
      "เรียนรู้พื้นฐานไซเบอร์ซีเคียวริตี้",
      "ความเข้าใจเกี่ยวกับภูมิทัศน์ภัยคุกคาม",
      "แนวปฏิบัติที่ดีด้านความปลอดภัย"
    ],
    image: "/mooc.png",
    link: undefined,
  }
];
  export const platforms: Experience[] = [
  {
    category: "platforms",
    title: "TryHackMe",
    titleTh: "TryHackMe",
    role: "Active Learner",
    roleTh: "ผู้เรียนรู้อย่างต่อเนื่อง",
    period: "2023 - Present",
    location: "Online Platform",
    description: "Top 10% rank with over 25 rooms completed and a 90+ active-day streak",
    descriptionTh: "อันดับท็อป 10% ด้วยการทำห้องมากกว่า 25 ห้องและสถิติการใช้งานต่อเนื่อง 90+ วัน",
    achievements: [
      "Completed 25+ cybersecurity challenges",
      "Maintained 90+ day active streak",
      "Top 10% global ranking"
    ],
    achievementsTh: [
      "ทำความท้าทายด้านไซเบอร์ซีเคียวริตี้มากกว่า 25 ครั้ง",
      "รักษาสถิติการใช้งานต่อเนื่อง 90+ วัน",
      "อันดับท็อป 10% ระดับโลก"
    ],
    link: "https://tryhackme.com/p/jedsada"
  },
  {
    category: "platforms",
    title: "HackTheBox",
    titleTh: "HackTheBox",
    role: "Script Kiddie",
    roleTh: "Script Kiddie",
    period: "2023 - Present",
    location: "Online Platform",
    description: "Completed multiple machines including Sea, Green Horn, and others",
    descriptionTh: "ทำเครื่องหลายเครื่องสำเร็จรวมถึง Sea, Green Horn และอื่นๆ",
    achievements: [
      "Completed multiple machine challenges",
      "Gained practical penetration testing experience",
      "Improved problem-solving skills"
    ],
    achievementsTh: [
      "ทำความท้าทายเครื่องหลายเครื่องสำเร็จ",
      "ได้รับประสบการณ์การทดสอบเจาะระบบจริง",
      "พัฒนาทักษะการแก้ปัญหา"
    ],
    link: "https://app.hackthebox.com/profile/jedsada"
  }
];
export const activities: Experience[] = [
  {
    image: "/secpro.jpg",
    type: "กิจกรรม",
    title: "Cyber Sec Pro 2: The cybersecurity bridge between digital world and human",
    period: "2024",
    location: "อีสติน แกรนด์ พญาไท",
    description: "อัปเดตเทรนด์ภัยคุกคามทางไซเบอร์และเทคโนโลยี AI ในปัจจุบัน ",
    keyActivities: [
      "แนวทางในการรับมือกับภัยคุกคามทางไซเบอร์ เพื่อรับมือกับภัยคุกคามที่ซับซ้อนเหล่านี้ ที่องค์กรจำเป็นต้องมีกลยุทธ์ในการป้องกันภัยคุกคามที่ครอบคลุม โดยอาศัยเทคโนโลยีที่ทันสมัย",
    ],
  },
  // เพิ่มกิจกรรมใหม่ได้ที่นี่
];
// รวมทั้งหมดเป็น experiences
export const allExperiences: Experience[] = [
  ...education,
  ...platforms,
  ...competitions,
  ...certifications,
  ...activities
];