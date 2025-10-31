class PDFProcessor {
    constructor() {
        this.selectedFiles = [];
        this.maxFiles = 15;
        this.minFiles = 10;
        this.maxFileSize = 20 * 1024 * 1024; // 20MB
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.fileList = document.getElementById('fileList');
        this.files = document.getElementById('files');
        this.message = document.getElementById('message');
        this.chatid = document.getElementById('chatid');
        this.userid = document.getElementById('userid');
        this.processBtn = document.getElementById('processBtn');
        this.resultsSection = document.getElementById('resultsSection');
        this.resultsMeta = document.getElementById('resultsMeta');
        this.markdownViewer = document.getElementById('markdownViewer');
        this.errorSection = document.getElementById('errorSection');
        this.errorMessage = document.getElementById('errorMessage');
    }

    bindEvents() {
        // File input change
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));
        
        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Process button
        this.processBtn.addEventListener('click', () => this.processFiles());
        
        // Action buttons
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadResults());
        document.getElementById('copyBtn').addEventListener('click', () => this.copyResults());
        document.getElementById('newProcessBtn').addEventListener('click', () => this.resetForm());
        
        // Form validation
        this.message.addEventListener('input', () => this.validateForm());
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
        this.handleFileSelect(files);
    }

    handleFileSelect(files) {
        const pdfFiles = Array.from(files).filter(file => file.type === 'application/pdf');
        
        // Validate file count
        if (pdfFiles.length < this.minFiles) {
            this.showError(`Please select at least ${this.minFiles} PDF files.`);
            return;
        }
        
        if (pdfFiles.length > this.maxFiles) {
            this.showError(`Please select no more than ${this.maxFiles} PDF files.`);
            return;
        }
        
        // Validate file sizes
        const oversizedFiles = pdfFiles.filter(file => file.size > this.maxFileSize);
        if (oversizedFiles.length > 0) {
            this.showError(`The following files exceed 20MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
            return;
        }
        
        this.selectedFiles = pdfFiles;
        this.updateFileList();
        this.validateForm();
        this.hideError();
    }

    updateFileList() {
        if (this.selectedFiles.length === 0) {
            this.fileList.style.display = 'none';
            return;
        }
        
        this.fileList.style.display = 'block';
        this.files.innerHTML = '';
        
        this.selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <svg class="file-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <div class="file-details">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${this.formatFileSize(file.size)}</div>
                    </div>
                </div>
                <button class="file-remove" onclick="pdfProcessor.removeFile(${index})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;
            this.files.appendChild(fileItem);
        });
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.updateFileList();
        this.validateForm();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    validateForm() {
        const isValid = this.selectedFiles.length >= this.minFiles && 
                       this.selectedFiles.length <= this.maxFiles && 
                       this.message.value.trim().length > 0;
        
        this.processBtn.disabled = !isValid;
    }

    async processFiles() {
        if (this.selectedFiles.length < this.minFiles || this.selectedFiles.length > this.maxFiles) {
            this.showError(`Please select between ${this.minFiles} and ${this.maxFiles} PDF files.`);
            return;
        }

        this.showLoading();
        this.hideError();
        this.hideResults();

        try {
            const formData = new FormData();
            
            // Add files
            this.selectedFiles.forEach(file => {
                formData.append('files', file);
            });
            
            // Add form data
            formData.append('message', this.message.value.trim());
            if (this.chatid.value.trim()) {
                formData.append('chatid', this.chatid.value.trim());
            }
            if (this.userid.value.trim()) {
                formData.append('userid', this.userid.value.trim());
            }

            const startTime = performance.now();
            
            const apiBase = window.API_BASE || '';
            const response = await fetch(`${apiBase}/process-pdfs`, {
                method: 'POST',
                body: formData
            });

            const endTime = performance.now();
            const clientTime = ((endTime - startTime) / 1000).toFixed(2);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const markdown = await response.text();
            const serverTime = response.headers.get('x-elapsed-seconds') || 'N/A';
            const processedFiles = response.headers.get('x-processed-files') || this.selectedFiles.length;

            this.showResults(markdown, {
                clientTime,
                serverTime,
                processedFiles
            });

        } catch (error) {
            console.error('Processing error:', error);
            this.showError(`Processing failed: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    showLoading() {
        this.processBtn.disabled = true;
        this.processBtn.classList.add('loading');
        this.processBtn.querySelector('.spinner').style.display = 'block';
    }

    hideLoading() {
        this.processBtn.disabled = false;
        this.processBtn.classList.remove('loading');
        this.processBtn.querySelector('.spinner').style.display = 'none';
    }

    showResults(markdown, meta) {
        this.resultsSection.style.display = 'block';
        this.resultsSection.classList.add('fade-in');
        
        this.markdownViewer.textContent = markdown;
        this.resultsMeta.innerHTML = `
            <span><strong>Files Processed:</strong> ${meta.processedFiles}</span>
            <span><strong>Server Time:</strong> ${meta.serverTime}s</span>
            <span><strong>Client Time:</strong> ${meta.clientTime}s</span>
        `;
        
        // Store markdown for download/copy
        this.currentMarkdown = markdown;
        
        // Scroll to results
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    hideResults() {
        this.resultsSection.style.display = 'none';
        this.resultsSection.classList.remove('fade-in');
    }

    showError(message) {
        this.errorSection.style.display = 'block';
        this.errorMessage.textContent = message;
        this.errorSection.classList.add('fade-in');
    }

    hideError() {
        this.errorSection.style.display = 'none';
        this.errorSection.classList.remove('fade-in');
    }

    downloadResults() {
        if (!this.currentMarkdown) return;
        
        const blob = new Blob([this.currentMarkdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pdf-processing-results-${new Date().toISOString().slice(0, 19)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    async copyResults() {
        if (!this.currentMarkdown) return;
        
        try {
            await navigator.clipboard.writeText(this.currentMarkdown);
            // Show temporary success message
            const btn = document.getElementById('copyBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.backgroundColor = '#10b981';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
            this.showError('Failed to copy to clipboard');
        }
    }

    resetForm() {
        this.selectedFiles = [];
        this.fileInput.value = '';
        this.message.value = '';
        this.chatid.value = '';
        this.userid.value = '';
        this.currentMarkdown = null;
        
        this.updateFileList();
        this.validateForm();
        this.hideResults();
        this.hideError();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize the application
const pdfProcessor = new PDFProcessor();

// Global function for file removal
window.removeFile = (index) => pdfProcessor.removeFile(index);
window.resetForm = () => pdfProcessor.resetForm();
