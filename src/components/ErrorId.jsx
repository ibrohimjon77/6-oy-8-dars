export const fromError=(data)=>{
  if(!data?.name)return 'Iltomos ismingizni kiriting';
  if(!data?.email)return'iltimos emailingizni kiriting';
  if(!data?.password)return 'iltimos parolingizni kiriting';
  return null;
}

// utils/firebaseErrors.js

export const getFirebaseErrorMessage = (error) => {
  if (!error) return "An unknown error occurred";

  const match = error.match(/\(auth\[^\]+\)/);

  if(!match)return "Something went  wrong. Place try again";

  const code = match[0].replace(/[()]/g,"");
    switch (code) {
      case "auth/email-already-in-use":
        return "Bu email bilan allaqachon ro‘yxatdan o‘tilgan!";
      case "auth/invalid-email":
        return "Email manzil noto‘g‘ri kiritilgan!";
      case "auth/weak-password":
        return "Parol juda kuchsiz, kamida 6 ta belgidan iborat bo‘lsin!";
      case "auth/user-not-found":
        return "Bunday foydalanuvchi topilmadi!";
      case "auth/wrong-password":
        return "Parol noto‘g‘ri!";
      case "auth/too-many-requests":
        return "Ko‘p marta urinish bo‘ldi, keyinroq urinib ko‘ring!";
      default:
        return "Noma’lum xatolik yuz berdi, qaytadan urinib ko‘ring!";
    }
};

