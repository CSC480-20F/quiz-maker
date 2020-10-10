import React from 'react';
import TopNavbar from './TopNavbar';



class CSVUpload extends React.Component{



render() {
    return(
        <>
            <TopNavbar/>

            <h1 className="text-center text-4xl">File Upload here</h1>
            <div className={`p-6 my-2 mx-auto max-w-md border-2`}
            onDragOver={(e)=>{
                e.preventDefault();
            }}
            onDrop={(e) => {
                e.preventDefault();

                //console.log(e.dataTransfer.files)
                Array.from(e.dataTransfer.files)
                .filter((file) => file.type === "text/csv")
                .forEach((file) => {
                    console.log(file);
                });
            }}
            >
                Drop it here
            </div>

        </>
    )
}

}


export default CSVUpload;
