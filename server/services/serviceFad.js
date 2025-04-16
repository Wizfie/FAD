import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid' // Import UUID
import dotenv from 'dotenv'

dotenv.config()

const filePath = process.env.DATA_FAD_PATH
const dataVendor = process.env.DATA_VENDOR_PATH

const ensureFolderAndFile = async (filePath, defaultContent = '[]') => {
  try {
    // Mengecek apakah file ada
    await fs.access(filePath)
  } catch (e) {
    if (e.code === 'ENOENT') {
      // Jika file tidak ditemukan, buat folder dan file baru
      console.log(`File tidak ditemukan, membuat file baru: ${filePath}`)
      const folder = path.dirname(filePath)
      await fs.mkdir(folder, { recursive: true })
      await fs.writeFile(filePath, defaultContent) // Inisialisasi file dengan konten default
    } else {
      throw e // Tangani error lainnya
    }
  }
}

// Simpan file ke JSON
const saveDataFad = async (formData) => {
  try {
    await ensureFolderAndFile(filePath) // Pastikan folder dan file ada

    const data = await fs.readFile(filePath, 'utf8')
    const jsonData = data.trim() === '' ? [] : JSON.parse(data)

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
    await ensureFolderAndFile(filePath) // Pastikan folder dan file ada

    const data = await fs.readFile(filePath, 'utf8')
    return data.trim() === '' ? [] : JSON.parse(data)
  } catch (e) {
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

// Simpan data vendor
const saveDataVendor = async (formData) => {
  try {
    await ensureFolderAndFile(dataVendor) // Pastikan folder dan file ada

    const data = await fs.readFile(dataVendor, 'utf8')
    const jsonData = data.trim() === '' ? [] : JSON.parse(data)

    // Menambahkan UUID sebagai ID untuk data baru
    const newData = { ...formData, id: uuidv4() }
    jsonData.push(newData) // Menambahkan data baru ke array

    // Menulis kembali data yang sudah diupdate ke file JSON
    await fs.writeFile(dataVendor, JSON.stringify(jsonData, null, 2))
    console.log('Data berhasil disimpan')
  } catch (e) {
    console.log('Gagal menyimpan data vendor', e)
  }
}

const readDataVendor = async () => {
  try {
    await ensureFolderAndFile(dataVendor)
    const data = await fs.readFile(dataVendor, 'utf8')

    return data.trim() === '' ? [] : JSON.parse(data)
  } catch (e) {
    console.log('Gagal membaca data vendor', e)
    throw e
  }
}

const updateDataVendor = async (id, updatedData) => {
  try {
    const jsonData = await readDataVendor()
    const index = jsonData.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Data tidak ditemukan')
    }
    jsonData[index] = { ...jsonData[index], ...updatedData }
    await fs.writeFile(dataVendor, JSON.stringify(jsonData, null, 2))
    console.log('Data vendor berhasil diperbarui')
    return { message: 'Data vendor berhasil diperbarui', data: jsonData[index] }
  } catch (e) {
    console.log('Gagal memperbarui data vendor', e)
    throw new Error('Gagal memperbarui data vendor')
  }
}

const deleteDataVendor = async (id) => {
  try {
    const jsonData = await readDataVendor()
    const index = jsonData.findIndex((item) => item.id === id)
    if (index === -1) {
      throw new Error('Data tidak ditemukan')
    }
    const deletedData = jsonData.splice(index, 1)
    await fs.writeFile(dataVendor, JSON.stringify(jsonData, null, 2))
    console.log('Data vendor berhasil dihapus')
    return { message: 'Data vendor berhasil dihapus', data: deletedData }
  } catch (e) {
    console.log('Gagal menghapus data vendor', e)
    throw new Error('Gagal menghapus data vendor')
  }
}

export {
  saveDataFad,
  readDataFad,
  updateDataFad,
  deleteDataFad,
  saveDataVendor,
  readDataVendor,
  updateDataVendor,
  deleteDataVendor,
}
