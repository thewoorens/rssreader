# RSS Reader

## Overview

RSS Reader is an open-source project designed to combat social media addiction by offering a clean, distraction-free platform for consuming content from RSS feeds. It promotes mindful content consumption and reduces reliance on algorithm-driven social media platforms.

## Tech Stack

### Frontend
- **Vue.js**: Progressive JavaScript framework for building dynamic user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive UI development.
- **Vite**: Next-generation frontend tooling for fast development and optimized builds.
- **Vue Router**: Official router for seamless navigation in Vue.js applications.

### Backend
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express.js**: Lightweight web framework for handling API requests.
- **MongoDB**: NoSQL database for storing feed metadata and user preferences.
- **Axios**: Promise-based HTTP client for fetching RSS feeds.

## Installation and Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **Yarn** (v1.22 or higher)
- **MongoDB** (local or cloud instance)
- **Git**

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/thewoorens/rssreader.git
   cd rssreader
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Configure the Backend**:
   - Navigate to `src/api`.
   - Create a `.env` file with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```
   - Replace `your_mongodb_connection_string` with your MongoDB URI.

4. **Run the Backend**:
   ```bash
   cd src/api
   yarn dev
   ```
   The backend will start on `http://localhost:5000` (or the specified `PORT`).

5. **Run the Frontend**:
   ```bash
   yarn serve
   ```
   The frontend will start on `http://localhost:8080`.

6. **Access the Application**:
   - Open your browser and navigate to `http://localhost:8080`.

---

# RSS Okuyucu

## Genel Bakış

RSS Okuyucu, sosyal medya bağımlılığıyla mücadele etmek için geliştirilmiş açık kaynak bir projedir. Kullanıcıların favori RSS beslemelerinden içeriğe basit, dikkat dağıtıcı olmayan bir platformda erişmelerini sağlar. Proje, bilinçli içerik tüketimini teşvik etmeyi ve algoritma odaklı sosyal medya platformlarına bağımlılığı azaltmayı amaçlar.

## Teknoloji Yığını

### Ön Uç
- **Vue.js**: Dinamik kullanıcı arayüzleri oluşturmak için progresif JavaScript çerçevesi.
- **Tailwind CSS**: Hızlı ve duyarlı arayüz geliştirme için yardımcı odaklı CSS çerçevesi.
- **Vite**: Hızlı geliştirme ve optimize edilmiş yapılar için yeni nesil ön uç aracı.
- **Vue Router**: Vue.js uygulamalarında sorunsuz gezinme için resmi yönlendirici.

### Arka Uç
- **Node.js**: Ölçeklenebilir sunucu tarafı uygulamaları için JavaScript çalışma zamanı.
- **Express.js**: API isteklerini yönetmek için hafif web çerçevesi.
- **MongoDB**: Besleme meta verileri ve kullanıcı tercihlerini depolamak için NoSQL veritabanı.
- **Axios**: RSS beslemelerini almak için promise tabanlı HTTP istemcisi.

## Kurulum ve Başlangıç

### Gereksinimler
- **Node.js** (v16 veya üzeri)
- **Yarn** (v1.22 veya üzeri)
- **MongoDB** (yerel veya bulut tabanlı)
- **Git**

### Adımlar

1. **Projeyi Klonlayın**:
   ```bash
   git clone https://github.com/thewoorens/rssreader.git
   cd rssreader
   ```

2. **Bağımlılıkları Yükleyin**:
   ```bash
   yarn install
   ```

3. **Arka Ucu Yapılandırın**:
   - `src/api` dizinine gidin.
   - Aşağıdaki içeriğe sahip bir `.env` dosyası oluşturun:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```
   - `your_mongodb_connection_string` kısmını MongoDB bağlantı adresinizle değiştirin.

4. **Arka Ucu Çalıştırın**:
   ```bash
   cd src/api
   yarn dev
   ```
   Arka uç, `http://localhost:5000` adresinde (veya belirtilen `PORT` üzerinde) başlayacaktır.

5. **Ön Ucu Çalıştırın**:
   ```bash
   yarn serve
   ```
   Ön uç, varsayılan olarak `http://localhost:8080` adresinde başlayacaktır.

6. **Uygulamaya Erişin**:
   - Tarayıcınızı açın ve `http://localhost:8080` adresine gidin.
