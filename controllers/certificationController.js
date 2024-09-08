const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const archiver = require('archiver'); // To zip files
const Student = require('../models/student');

// Fetch student data from Mongoose
async function getStudentDataById(id) {
    try {
        const student = await Student.findById(id).exec();
        if (!student) {
            console.log(`Student with ID ${id} not found.`);
            return null;
        }
        return {
            firstname: student.firstname,
            lastname: student.lastname,
            // Format date as needed, if you want to include it
            date: student.date ? student.date.toDateString() : 'N/A',
        };
    } catch (error) {
        console.error(`Error fetching student with ID ${id}:`, error);
        return null;
    }
}

// Endpoint to handle template upload and student ID list
exports.certification = async (req, res) => {
    try {
        const studentIds = JSON.parse(req.body.studentIds || '[]'); // Parse JSON string to array
        const templatePath = req.file.path; // Template file uploaded by the user

        // Load template content
        const content = fs.readFileSync(templatePath, 'binary');

        const outputDir = path.resolve(__dirname, 'output'); // Output directory
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir); // Create output directory if not exists
        }

        const filesToZip = [];
        console.log("Selected to create certifications are:", studentIds);

        // Process each student
        for (const id of studentIds) {
            const studentData = await getStudentDataById(id); // Await the async function
            console.log("Student Data Are:", studentData);
            if (studentData) {
                const zip = new PizZip(content); // Create a new PizZip instance for each student
                const doc = new Docxtemplater(zip);

                // Set the data for this student
                doc.setData(studentData);

                try {
                    doc.render();
                } catch (error) {
                    console.error(`Error processing student ${id}:`, error);
                    return res.status(500).send(`Error processing student with ID ${id}.`);
                }

                // Generate and save filled template for each student
                const outputBuffer = doc.getZip().generate({ type: 'nodebuffer' });
                const outputPath = path.join(outputDir, `student_${id}.docx`);
                fs.writeFileSync(outputPath, outputBuffer);

                // Add each file to the list for zipping
                filesToZip.push({
                    path: outputPath,
                    name: `student_${id}.docx`
                });
            }
        }

        // Create a zip archive of all generated files
        const zipFilePath = path.join(outputDir, 'students_filled.zip');
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Maximum compression
        });

        output.on('close', () => {
            // Send the zip file after it's been finalized
            res.download(zipFilePath, 'students_filled.zip', (err) => {
                if (err) {
                    console.error('Error sending zip file:', err);
                    res.status(500).send('Error sending file.');
                }
            });
        });

        archive.on('error', (err) => {
            console.error('Error creating zip file:', err);
            res.status(500).send('Error creating zip file.');
        });

        archive.pipe(output);

        // Append each file to the archive
        filesToZip.forEach(file => {
            archive.file(file.path, { name: file.name });
        });

        // Finalize the zip file
        archive.finalize();
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error processing request.');
    }
};
