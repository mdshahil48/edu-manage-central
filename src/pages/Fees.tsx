
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, CreditCard, Download, CalendarDays, FileText, AlertTriangle, CheckCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Fee data mock
const feeData = {
  currentSemester: {
    id: "FALL2023",
    name: "Fall Semester 2023",
    totalAmount: 45000,
    dueDate: "2023-09-15",
    status: "paid",
    transactions: [
      {
        id: "TXN123456",
        date: "2023-08-10",
        amount: 45000,
        method: "Online Banking",
        status: "success"
      }
    ]
  },
  previousSemesters: [
    {
      id: "SPRING2023",
      name: "Spring Semester 2023",
      totalAmount: 42000,
      dueDate: "2023-03-15",
      status: "paid",
      transactions: [
        {
          id: "TXN122456",
          date: "2023-02-28",
          amount: 21000,
          method: "Credit Card",
          status: "success"
        },
        {
          id: "TXN122457",
          date: "2023-03-10",
          amount: 21000,
          method: "Online Banking",
          status: "success"
        }
      ]
    },
    {
      id: "FALL2022",
      name: "Fall Semester 2022",
      totalAmount: 40000,
      dueDate: "2022-09-15",
      status: "paid",
      transactions: [
        {
          id: "TXN109456",
          date: "2022-08-05",
          amount: 40000,
          method: "Online Banking",
          status: "success"
        }
      ]
    }
  ],
  pendingFees: [
    {
      id: "LIB2023",
      name: "Library Fine",
      amount: 500,
      dueDate: "2023-10-30",
      status: "pending"
    },
    {
      id: "LAB2023",
      name: "Laboratory Fee",
      amount: 2000,
      dueDate: "2023-10-15",
      status: "pending"
    }
  ]
};

const Fees = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<{ id: string; name: string; amount: number } | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePayment = () => {
    if (!selectedFee || !paymentMethod) return;
    
    toast({
      title: "Payment Successful",
      description: `₹${selectedFee.amount} paid for ${selectedFee.name}`,
    });
    
    setIsPaymentDialogOpen(false);
    setPaymentMethod("");
    setSelectedFee(null);
  };

  const startPayment = (fee: { id: string; name: string; amount: number }) => {
    setSelectedFee(fee);
    setIsPaymentDialogOpen(true);
  };

  const downloadReceipt = (transactionId: string) => {
    toast({
      title: "Receipt Download",
      description: `Receipt for transaction ${transactionId} is being downloaded.`,
    });
  };

  // Fee status badge component
  const FeeStatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> Paid</Badge>;
      case "pending":
        return <Badge variant="outline" className="border-amber-500 text-amber-500"><AlertTriangle className="h-3 w-3 mr-1" /> Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Admin view for fees
  if (user?.role === "admin") {
    return (
      <>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Fee Management</h1>
          <p className="text-muted-foreground">Manage and track student fees</p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection Overview</CardTitle>
              <CardDescription>Current semester statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="text-sm text-green-600">Total Collected</p>
                  <h3 className="text-2xl font-bold">₹24,30,000</h3>
                  <p className="text-xs text-green-600 mt-1">+12% from last semester</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-md">
                  <p className="text-sm text-amber-600">Pending Collection</p>
                  <h3 className="text-2xl font-bold">₹5,75,000</h3>
                  <p className="text-xs text-amber-600 mt-1">From 45 students</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-600">Total Students</p>
                  <h3 className="text-2xl font-bold">1,245</h3>
                  <p className="text-xs text-blue-600 mt-1">96% payment rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Fee Management Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-24 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Generate Fee Reports</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <CheckCheck className="h-6 w-6 mb-2" />
                  <span>Fee Structure Setup</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <CalendarDays className="h-6 w-6 mb-2" />
                  <span>Set Due Dates</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <AlertTriangle className="h-6 w-6 mb-2" />
                  <span>Payment Reminders</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Student view for fees
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Fee Payment</h1>
        <p className="text-muted-foreground">Manage and pay your fees</p>
      </div>
      
      <Tabs defaultValue="current">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="pending">Pending Fees</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        
        {/* Current semester tab */}
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{feeData.currentSemester.name}</CardTitle>
                  <CardDescription>Due date: {feeData.currentSemester.dueDate}</CardDescription>
                </div>
                <FeeStatusBadge status={feeData.currentSemester.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Total Amount:</span>
                  <span className="font-medium">₹{feeData.currentSemester.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Status:</span>
                  <span className={`font-medium ${feeData.currentSemester.status === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                    {feeData.currentSemester.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
              
              <h4 className="text-sm font-medium mb-3">Transaction History</h4>
              <div className="space-y-3">
                {feeData.currentSemester.transactions.map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{transaction.method}</p>
                      <p className="text-xs text-gray-500">{transaction.date} • {transaction.id}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-medium mr-4">₹{transaction.amount.toLocaleString()}</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => downloadReceipt(transaction.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pending fees tab */}
        <TabsContent value="pending">
          <div className="grid gap-4">
            {feeData.pendingFees.length > 0 ? (
              feeData.pendingFees.map(fee => (
                <Card key={fee.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{fee.name}</CardTitle>
                        <CardDescription>Due date: {fee.dueDate}</CardDescription>
                      </div>
                      <FeeStatusBadge status={fee.status} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount:</span>
                        <span className="font-medium">₹{fee.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="bg-erp-600 hover:bg-erp-700 w-full"
                      onClick={() => startPayment(fee)}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay Now
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="text-center p-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Pending Fees</h3>
                <p className="text-gray-500 mt-1">You're all caught up on payments!</p>
              </Card>
            )}
          </div>
        </TabsContent>
        
        {/* Payment history tab */}
        <TabsContent value="history">
          <div className="grid gap-4">
            {feeData.previousSemesters.map(semester => (
              <Card key={semester.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{semester.name}</CardTitle>
                      <CardDescription>Due date: {semester.dueDate}</CardDescription>
                    </div>
                    <FeeStatusBadge status={semester.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Amount:</span>
                      <span className="font-medium">₹{semester.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium mb-3">Transaction History</h4>
                  <div className="space-y-3">
                    {semester.transactions.map(transaction => (
                      <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{transaction.method}</p>
                          <p className="text-xs text-gray-500">{transaction.date} • {transaction.id}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-medium mr-4">₹{transaction.amount.toLocaleString()}</p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadReceipt(transaction.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Payment dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Complete your payment for {selectedFee?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Fee Amount</Label>
              <div className="text-xl font-bold">₹{selectedFee?.amount.toLocaleString()}</div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                  <SelectItem value="net-banking">Net Banking</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {paymentMethod === 'credit-card' || paymentMethod === 'debit-card' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </div>
            ) : paymentMethod ? (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm">
                  You'll be redirected to complete your payment securely using {" "}
                  {paymentMethod === 'net-banking' ? 'Net Banking' : 
                   paymentMethod === 'upi' ? 'UPI' : paymentMethod}
                </p>
              </div>
            ) : null}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsPaymentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-erp-600 hover:bg-erp-700"
              onClick={handlePayment}
              disabled={!paymentMethod}
            >
              Pay ₹{selectedFee?.amount.toLocaleString()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Fees;
