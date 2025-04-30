<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        deviceInfo: '',
      },
      isLoading: false,
      errorMessage: ''
    }
  },
  mounted() {
    this.getDeviceInfo().then(deviceInfo => {
      this.form.deviceInfo = deviceInfo;
    }).catch(error => {
      console.error('Error fetching client data:', error);
    });
  },
  methods: {
    getDeviceInfo: async function () {
      const ipRes = await fetch('https://ipapi.co/json/');
      const ipData = await ipRes.json();
      ipData.org = undefined;
      ipData.country_name = undefined;

      return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        ip: ipData.ip,
        city: ipData.city,
        region: ipData.region,
        country: ipData.country_name,
        isp: ipData.org
      };
    },

    async handleSubmit() {
      const validationError = this.validateForm();
      if (validationError) {
        this.errorMessage = validationError;
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      try {
        const response = await this.$apiService.post('users/register', this.form);
        this.isLoading = false;
        switch (response) {
          case 200:
            this.$router.push({name: 'login', query: {email: this.form.email, showRegisterSuccess: true}});
            break;
          case 409:
            this.errorMessage = 'Bu email adresine sahip bir hesap zaten var!';
            break;
          case 408:
            this.errorMessage = 'Daha güçlü bir parola seçmelisin! En az 6 karakter uzunluğunda olmalı';
            break;
          case 400:
            this.errorMessage = 'Lütfen tüm alanları doğru bir şekilde doldurduğunuzdan emin olun';
            break;
          default:
            this.errorMessage = 'Kayıt işlemi başarısız oldu';
            this.resetForm();
        }
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      }
    },

    validateForm() {
      const {name, email, password, confirmPassword} = this.form;

      if (!email || !password) return 'Lütfen email ve şifrenizi giriniz';
      if (password !== confirmPassword) return 'Şifreler eşleşmiyor';
      if (password.length < 6) return 'Şifre en az 6 karakter uzunluğunda olmalıdır';
      if (name.length < 3) return 'Adınız en az 3 karakter uzunluğunda olmalıdır';
      if (!email.includes('@') || !email.includes('.') || email.length < 5) return 'Lütfen geçerli bir email adresi giriniz';

      const commonEmailProviders = /@(gmail|yahoo|hotmail|outlook|icloud|yandex|protonmail|proton|tutanota|zoho|mail\.ru|yahoo\.(co\.uk|com\.tr|com)|hotmail\.(co\.uk|com\.tr|com))$/i;
      if (commonEmailProviders.test(email)) {
        return 'Lütfen geçerli bir email adresi giriniz';
      }

      return null;
    },

    resetForm() {
      this.form = {name: '', email: '', password: '', confirmPassword: ''};
    }
  },
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
    <div class="sm:mx-auto sm:w-full ">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        RSS Okuyucusu Hesabını Oluştur
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Eğer RSS okuyucu hesabınız varsa
        <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          Hemen Giriş Yapın!
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div v-if="errorMessage" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                     fill="currentColor">
                  <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ errorMessage }}</h3>
              </div>
            </div>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Adın
            </label>
            <div class="mt-1">
              <input id="name" v-model="form.name" name="name" type="text" autocomplete="name" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email adresin
            </label>
            <div class="mt-1">
              <input id="email" v-model="form.email" name="email" type="email" autocomplete="email" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Şifren
            </label>
            <div class="mt-1">
              <input id="password" v-model="form.password" name="password" type="password"
                     autocomplete="current-password" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 sm:text-sm"/>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Şifreni Tekrarla
            </label>
            <div class="mt-1">
              <input id="confirmPassword" v-model="form.confirmPassword" name="confirmPassword" type="password"
                     required autocomplete="current-password"
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 sm:text-sm"/>
            </div>
          </div>

          <div>
            <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    :disabled="isLoading"
                    :class="{'opacity-50 cursor-not-allowed': isLoading}">
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Hesabını Oluşturuyoruz...' : 'Kayıt Ol' }}
            </button>
          </div>
        </form>
      </div>
      <div>
        <p class="mt-2 text-center text-sm text-gray-600">
          <router-link to="/" class="font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 class="mr-2 bi bi-arrow-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
            Ana Sayfaya Dön
          </router-link>
        </p>
      </div>
    </div>


  </div>
</template>