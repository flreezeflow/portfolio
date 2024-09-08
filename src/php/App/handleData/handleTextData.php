<?php 

declare(strict_types=1);

namespace App\handleData;

class handleTextData{
    private $name;
    private $email;
    private $body;

    function __construct($name, $body ,$email = null){
        $this->name = $this->sanitizeString($name);
        $this->email = $this->sanitizeString($email);
        $this->body = $this->sanitizeString($body);
    }

    public function validateData(): bool{
        if($this->email){
            if(!$this->isValidEmail($this->email)){
                return false;
            }
        }
        return true;
    }

    private function sanitizeString(string $input): string {
        $sanitized = strip_tags(trim($input));
        $sanitized = preg_replace('/[^A-Za-z0-9 ]/', '', $sanitized);
        $sanitized = trim($sanitized);

        return $sanitized;
    }

    private function isValidEmail(string $email): bool {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
}