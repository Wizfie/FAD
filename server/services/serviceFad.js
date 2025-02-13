import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid' // Import UUID

const folderPath = 'C:\\MyLocal\\Data\\DataFad'

const filePath = path.join(folderPath, 'dataFad.json')

// Simpan file ke JSON
const saveDataFad = async (formData) => {
  try {
    let jsonData = []

    try {
      // Mengecek apakah file ada
      await fs.access(filePath)

      const data = await fs.readFile(filePath, 'utf8')

      // Jika data kosong, langsung inisialisasi jsonData dengan array kosong
      if (data.trim() === '') {
        console.log('File kosong, membuat file baru')
        jsonData = [] // File kosong, buat array kosong
      } else {
        // Parse JSON jika data ada
        jsonData = JSON.parse(data)
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        console.log('File tidak ditemukan, membuat file baru')
        await fs.mkdir(folderPath, { recursive: true })
        jsonData = [] // Jika file tidak ditemukan, inisialisasi dengan array kosong
      } else {
        throw e // Tangani error lainnya
      }
    }

    // Menambahkan UUID sebagai ID untuk data baru
    const newData = { ...formData, id: uuidv4() }
    jsonData.push(newData) // Menambahkan data baru ke array

    // Menulis kembali data yang sudah diupdate ke file JSON
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2))
    console.log('Data berhasil disimpan')
  } catch (e) {
    console.log('Gagal menyimpan data', e)
  }
}

// Membaca data dari file JSON
const readDataFad = async () => {
  try {
    // Mengecek apakah file ada
    await fs.access(filePath)

    // Membaca file
    const data = await fs.readFile(filePath, 'utf8')

    // Jika data kosong, langsung kembalikan array kosong
    if (data.trim() === '') {
      console.log('File kosong, mengembalikan array kosong')
      return []
    }

    // Parsing data JSON dan mengembalikan
    return JSON.parse(data)
  } catch (e) {
    if (e.code === 'ENOENT') {
      // Jika file tidak ditemukan, buat file baru dan kembalikan array kosong
      console.log('File tidak ditemukan, membuat file baru')
      await fs.mkdir(folderPath, { recursive: true })
      return []
    }
    // Menangani error lainnya
    console.log('Gagal membaca data', e)
    throw e
  }
}

// Memperbarui data berdasarkan ID
const updateDataFad = async (id, updatedData) => {
  try {
    const jsonData = await readDataFad()
    const index = jsonData.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Data tidak ditemukan')
    }
    jsonData[index] = { ...jsonData[index], ...updatedData }
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2))
    console.log('Data berhasil diperbarui')
    return { message: 'Data berhasil diperbarui', data: jsonData[index] }
  } catch (e) {
    console.log('Gagal memperbarui data', e)
    throw new Error('Gagal memperbarui data')
  }
}

// Menghapus data berdasarkan ID
const deleteDataFad = async (id) => {
  try {
    const jsonData = await readDataFad()
    const index = jsonData.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Data tidak ditemukan')
    }
    const deletedData = jsonData.splice(index, 1)
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2))
    console.log('Data berhasil dihapus')
    return { message: 'Data berhasil dihapus', data: deletedData }
  } catch (e) {
    console.log('Gagal menghapus data', e)
    throw new Error('Gagal menghapus data')
  }
}

export { saveDataFad, readDataFad, updateDataFad, deleteDataFad }
