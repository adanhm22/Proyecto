var pdf = {
    ActivateOptions: false,
    opt: 
    {
        margin:       0.5,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      },

    createPdf: function() 
    {
        if(pdf.options)
            html2pdf().from(document.documentElement).set(opt).save();
        else
            html2pdf().from(document.documentElement).save();
    }
};

