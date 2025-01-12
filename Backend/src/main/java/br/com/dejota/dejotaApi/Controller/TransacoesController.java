package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Transacoes;
import br.com.dejota.dejotaApi.repositorio.ProdutoRepositorio;
import br.com.dejota.dejotaApi.repositorio.TransacaoesRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transacao")
public class TransacoesController {
    @Autowired
    private TransacaoesRepositorio tranRepositorio;
    @CrossOrigin
    @PostMapping
    public String incluir(@RequestBody Transacoes tran){
        String messageReturn;
        try {
            tranRepositorio.save(tran);
            messageReturn ="Foi";
        }
        catch(Exception err){
            messageReturn ="NÂO Foi: "+err;
        }
        return messageReturn;
    }
}
