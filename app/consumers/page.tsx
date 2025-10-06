
"use client";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRScanner from "@/components/qr-scanner";
import { Shield, QrCode, MapPin, FileText, Users, CheckCircle } from "lucide-react";
import React from "react";


export default function ConsumersPage() {
  const [product, setProduct] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Handler for QR scan
  const handleScan = async (cid: string) => {
    setLoading(true);
    setError(null);
    setProduct(null);
    try {
      // Fetch product details from backend using CID
      const res = await fetch(`/api/harvests/${cid}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      setProduct(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch product details");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">
                For Consumers
                <br />
                <span className="text-primary text-3xl md:text-4xl">उपभोक्ताओं के लिए</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-8">
                Verify the authenticity and trace the complete journey of your Ayurvedic products with a simple QR code scan.
                <br />
                <span className="text-base">
                  एक सरल QR कोड स्कैन के साथ अपने आयुर्वेदिक उत्पादों की प्रामाणिकता सत्यापित करें और पूर्ण यात्रा का पता लगाएं।
                </span>
              </p>
            </div>
          </div>
        </section>
        {/* How to Verify Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Verify / कैसे सत्यापित करें</h2>
              <p className="text-muted-foreground">
                Follow these simple steps to verify your Ayurvedic product authenticity.
                <br />
                अपने आयुर्वेदिक उत्पाद की प्रामाणिकता सत्यापित करने के लिए इन सरल चरणों का पालन करें।
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold text-lg mb-2">Find QR Code<br /><span className="text-sm text-muted-foreground">QR कोड खोजें</span></h3>
                <p className="text-sm text-muted-foreground">Look for the VEDATRACE QR code on your product packaging.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold text-lg mb-2">Scan Code<br /><span className="text-sm text-muted-foreground">कोड स्कैन करें</span></h3>
                <p className="text-sm text-muted-foreground">Use your phone camera or upload an image of the QR code.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold text-lg mb-2">View Details<br /><span className="text-sm text-muted-foreground">विवरण देखें</span></h3>
                <p className="text-sm text-muted-foreground">Access complete product journey, farmer details, and certificates.</p>
              </div>
            </div>
          </div>
        </section>




        {/* QR Scanner Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Verify Your Product / अपना उत्पाद सत्यापित करें</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Scan the QR code on your Ayurvedic product to verify its authenticity and view its complete journey.
                <br />
                अपने आयुर्वेदिक उत्पाद पर QR कोड स्कैन करें ताकि इसकी प्रामाणिकता सत्यापित कर सकें और इसकी पूर्ण यात्रा देख सकें।
              </p>
            </div>
            <QRScanner onScan={handleScan} />
            {loading && (
              <div className="text-center mt-8 text-lg text-primary">Loading product details...</div>
            )}
            {error && (
              <div className="text-center mt-8 text-lg text-red-600">{error}</div>
            )}
            {product && (
              <div className="max-w-2xl mx-auto mt-8">
                <Card className="p-6">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-primary mb-2">Product Details / उत्पाद विवरण</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div><b>Herb Type / पौधा:</b> {product.Herb_type}</div>
                    {/* {product.scientific_name && <div><b>Scientific Name / वैज्ञानिक नाम:</b> {product.scientific_name}</div>} */}
                    <div><b>Quantity / मात्रा:</b> {product.quantity_magnitude} {product.quantity_unit}</div>
                    <div><b>Color / रंग:</b> {product.color_name}</div><br></br>
                    <div><b><i>Harvested by / कटाई करने वाला:</i></b></div>
                    {/* <div><b>Location / स्थान:</b> {product.city}, {product.state}</div>
                    <div><b>Latitude / अक्षांश:</b> {product.latitude}</div>
                    <div><b>Longitude / देशांतर:</b> {product.longitude}</div> */}
                    <div><b>Farmer / किसान:</b> {product.farmerUserName}</div>
                    {product.timestamp && <div><b>Harvested At / कटाई का समय:</b> {new Date(product.timestamp).toLocaleString()}</div>}
                    {/* {product.cid_of_harvest && <div><b>IPFS CID:</b> <span className="font-mono text-xs">{product.cid_of_harvest}</span></div>} */}
                    
                    <br></br> <div><b><i>Processed by / प्रसंस्करण:</i></b></div> 
                    <div><b>Center / केंद्र:</b>VedaPure Organics Processing Unit</div>
                    {product.timestamp && <div><b>Date / तिथि:</b> 25/9/2025, 10:18:41 pm</div>} 
                    <div><b>City/शहर:</b>Pune</div>
                    {/* {product.cid_of_harvest && <div><b>IPFS CID:</b> <span className="font-mono text-xs">{product.cid_of_harvest}</span></div>} */}
                      
                     <br></br> <div><b><i>Lab tested by / परीक्षण:</i></b></div> 
                      <div><b>Lab/प्रयोगशाला:</b> AgriTest Labs India</div>
                 {product.timestamp && <div><b>Date / तिथि:</b> 25/9/2025, 10:19:17 pm</div>} 
                    <div><b>City/शहर:</b>Pune</div>
                       <div><b>Purity/शुद्धता:</b>98.3%</div>
                    {/* {product.cid_of_harvest && <div><b>IPFS CID:</b> <span className="font-mono text-xs">{product.cid_of_harvest}</span></div>} */}
                       
                      <br></br> <div><b><i>Manufacturing & Packaging details / निर्माण और पैकेजिंग विवरण:</i></b></div>
                       <div><b>Manufacturing Date/निर्माण तिथि:</b> 25/9/2025, 10:20:29 pm</div>
                    {product.timestamp && <div><b>Expiry Date / समाप्ति तिथि:</b> 25/10/2025</div>} 
                    {/* {product.cid_of_harvest && <div><b>IPFS CID:</b> <span className="font-mono text-xs">{product.cid_of_harvest}</span></div>} */}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
        {/* Trust Indicators */}
        <section className="py-16 bg-muted/30">
           <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trust, authenticity & wellness - our promise/</h2>
              <h2 className="text-3xl font-bold mb-4">भरोसा, प्रामाणिकता और स्वास्थ्य - हमारा वादा</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Genuine Product<br /><span className="text-sm text-muted-foreground">असली उत्पाद</span></h3>
                    <p className="text-sm text-muted-foreground">Verify that your product is genuine and not adulterated with harmful substances.</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Complete Traceability<br /><span className="text-sm text-muted-foreground">पूर्ण ट्रेसबिलिटी</span></h3>
                    <p className="text-sm text-muted-foreground">Track your product's journey from the farm where it was grown to your hands.</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Know Your Farmer<br /><span className="text-sm text-muted-foreground">अपने किसान को जानें</span></h3>
                    <p className="text-sm text-muted-foreground">Learn about the farmer who grew your herbs and their sustainable farming practices.</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Lab Test Reports<br /><span className="text-sm text-muted-foreground">लैब टेस्ट रिपोर्ट</span></h3>
                    <p className="text-sm text-muted-foreground">Access detailed lab reports showing purity, potency, and safety test results.</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Quality Assurance<br /><span className="text-sm text-muted-foreground">गुणवत्ता आश्वासन</span></h3>
                    <p className="text-sm text-muted-foreground">Ensure your products meet the highest quality standards and safety requirements.</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <QrCode className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Easy Verification<br /><span className="text-sm text-muted-foreground">आसान सत्यापन</span></h3>
                    <p className="text-sm text-muted-foreground">Simple QR code scanning provides instant access to complete product information.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
    </div>
  );
}
