import { saveDataFad, readDataFad, updateDataFad, deleteDataFad } from '../services/serviceFad.js'

const saveDataHandler = async (req, res) => {
  try {
    const formData = req.body
    const message = await saveDataFad(formData)
    res.status(200).json({ message })
  } catch (e) {
    res.status(500).json({
      error: e.message || 'internal server error',
    })
  }
}

// Controller untuk membaca data
const getDataHandler = async (req, res) => {
  try {
    const data = await readDataFad()
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ message: 'Terjadi kesalahan saat membaca data', error: e.message })
  }
}

// Controller untuk memperbarui data berdasarkan ID
const updateDataHandler = async (req, res) => {
  const { id } = req.params
  const updatedData = req.body
  try {
    const result = await updateDataFad(id, updatedData)
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui data', error: e.message })
  }
}

// Controller untuk menghapus data berdasarkan ID
const deleteDataHandler = async (req, res) => {
  const { id } = req.params
  try {
    const result = await deleteDataFad(id)
    res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus data', error: e.message })
  }
}

export { saveDataHandler, getDataHandler, updateDataHandler, deleteDataHandler }
