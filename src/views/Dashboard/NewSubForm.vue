<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Yeni Feed Ekle</h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="addFeed" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Feed Adı</label>
            <input
                type="text"
                id="name"
                v-model="newFeed.name"
                ref="feedName"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Örnek: Tech News"
            />
          </div>

          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 mb-1">Feed URL</label>
            <input
                type="url"
                id="url"
                v-model="newFeed.url"
                ref="feedUrl"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/feed.xml"
            />
          </div>

          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
                id="category"
                v-model="newFeed.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="technology">Teknoloji</option>
              <option value="news">Haberler</option>
              <option value="sports">Spor</option>
              <option value="entertainment">Eğlence</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3 pt-2">
            <button
                type="button"
                @click="$emit('close')"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              İptal
            </button>
            <button
                type="submit"
                :disabled="!isFormValid"
                :class="{'opacity-50 cursor-not-allowed': !isFormValid, 'hover:bg-blue-600': isFormValid}"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewSubForm',
  data() {
    return {
      newFeed: {
        name: '',
        url: '',
        category: 'technology'
      },
    }
  },
  computed: {
    isFormValid() {
      return this.newFeed.name && this.newFeed.url;
    }
  },
  methods: {
    async addFeed() {
      if (!this.isValidUrl(this.newFeed.url)) {
        this.$toast.error('Geçersiz URL formatı');
        return;
      }

      try {
        const response = await this.$apiService.post('rss/save', this.newFeed);

        if (response.status === 200) {
          this.$toast.success('Feed başarıyla eklendi!');
          this.newFeed = {name: '', url: '', category: 'technology'};
          this.$emit('success');
        }
      } catch (error) {
        this.$toast.error('Feed eklenirken bir hata oluştu: ' + error.message);
      }
    },

    isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }
  }
};
</script>