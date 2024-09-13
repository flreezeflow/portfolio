<?php

declare(strict_types=1);

namespace App\sendData;

use App\receiveData\retreiveData,
    Symfony\Component\Mailer\MailerInterface,
    Symfony\Component\Mime\Email;

class sendEmail extends retreiveData{
    public function sendEmail(MailerInterface $mailer){
        $this->setData();
            $email = (new Email())
            ->from($this->email)
            ->to('gfloriaan616@gmail.com')
            ->subject('Potential client')
            ->text($this->formatDataAsString())
            ->html(`<h1
                style="
                background: #28c701;
                width: 22%;
                border-radius: 5px;
                text-align: center;
                color: #fff"
                >Loan Application</h1>
                <h2>Name: $this->name </h2>
                <div style="
                display: flex;
                flex-direction: row;
                gap: 20px">
                    <div>
                    <h3 style="color: blue;">Contact details:</h3>
                        <div
                        style="
                        display: flex;
                        flex-direction: column;">
                            <p>Email: $this->email</p>
                        </div>
                    </div>
                    <div>
                        <h3 style="color: green;">Application details:</h3>
                        <div
                        style="
                        display: flex;
                        flex-direction: column;">
                            <p>body: $this->body</p>
                        </div> 
                    </div>
                </div>
            `);

            try {
                $mailer->send($email);
            } catch (\Exception $e) {
                return[
                    'status' => false,
                    'error' => 'Failed to send email: ',
                    'details' => $e->getMessage()
                ];
            }
    }
    
    private function formatDataAsString(): string {
        return sprintf(
            "Name: %s\nEmail: %s\nbody: %s",
            $this->name,
            $this->email,
            $this->body,
        );
    }
}